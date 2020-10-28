const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

// @route           GET api/auth
// @description     Get name and isAdmin
// @access          Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const { name, isAdmin, _id } = user;

        res.status(200).json({ name, isAdmin, _id });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route           POST api/auth
// @description     Login user & get token
// @access          Public
router.post(
    '/',
    [
        check('email', 'Veuillez saisir une adresse mail valide').isEmail(),
        check('password', 'Un mot de passe est requis').exists(),
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
                return res.status(400).send('Identifiants incorrects');
            }

            const { id, isAdmin, name } = user;

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(400).send('Identifiants incorrects');
            }

            const payload = {
                user: {
                    id,
                    isAdmin,
                },
            };

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 86400 }, (error, token) => {
                if (error) throw error;
                res.json({ token, isAdmin, name });
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Erreur serveur');
        }
    }
);

module.exports = router;
