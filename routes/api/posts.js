const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route           GET api/posts
// @description     Get all posts on a particular film
// @access          Public
router.get('/:id', async (req, res) => {
    try {
        let posts = await Post.find({ film: req.params.id });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// @route           POST api/posts
// @description     Create a new post on a particular film
// @access          Private
router.post(
    '/:id',
    [
        auth,
        [
            check('text', 'Un texte est attendu').not().isEmpty(),
            check('title', 'Un titre est attendu').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findOne({ _id: req.user.id }).select('-password');
            let post = new Post({
                film: req.params.id,
                user: req.user.id,
                name: user.name,
                text: req.body.text,
                title: req.body.title,
                date: Date.now(),
            });
            await post.save();
            return res.status(201).json(post);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);

// @route           DELETE api/posts/:id
// @description     Delete a post
// @access          Private/admin
router.delete('/:id', auth, async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id });
        if (post.user == req.user.id || req.user.isAdmin === true) {
            await Post.deleteOne({ _id: req.params.id });
            return res.status(202).json('Le commentaire a été supprimé');
        }
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
});

module.exports = router;
