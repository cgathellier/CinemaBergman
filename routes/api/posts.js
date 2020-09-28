const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route           GET api/posts
// @description     Get all posts
// @access          Public
router.get('/', async (req, res) => {});

// @route           POST api/posts
// @description     Create a new post
// @access          Private
router.post('/', [auth, [check('message', 'Un message est attendu').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findOne({ _id: req.user.id }).select('-password');
        let post = new Post({
            user: req.user.id,
            name: user.name,
            message: req.body.message,
        });
        await post.save();
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
