const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

// @route           GET api/auth
// @description     Test route
// @access          Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).send('Identifiants incorrects');
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route           POST api/auth
// @description     Authenticate user & get token
// @access          Public
router.post(
    '/',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).send('Invalid credentials');
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(400).send('Invalid credentials');
            }

            const payload = {
                user: {
                    id: user.id,
                    isAdmin: user.isAdmin,
                },
            };

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 86400 }, (error, token) => {
                if (error) throw error;
                res.json({ token });
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
