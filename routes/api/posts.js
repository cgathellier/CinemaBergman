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
    [auth, [check('message', 'Un message est attendu').not().isEmpty()]],
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
                message: req.body.message,
                date: Date.now(),
            });
            await post.save();
            return res.status(201).json(post);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;
