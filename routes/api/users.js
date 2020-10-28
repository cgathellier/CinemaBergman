const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route           POST api/users
// @description     Create user
// @access          Public
router.post(
    '/',
    [
        check('name', "Un nom d'utilisateur est requis").not().isEmpty(),
        check('email', 'Veuillez saisr une adresse mail valide').isEmail(),
        check('password', "Veuillez saisir un mot de passe d'au moins 6 caractères").isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ isAdmin: true });
            if (req.body.isAdmin && user) {
                return res.status(401).send('Non autorisé');
            }
            user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .send('Un utilisateur a déjà été créé avec cette adresse email');
            }

            user = new User({
                name,
                email,
                password,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const { id, isAdmin } = user;

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
