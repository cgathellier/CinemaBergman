const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Showtime = require('../../models/Showtime');
const Booking = require('../../models/Booking');
const auth = require('../../middleware/auth');

// @route           POST /api/showtimes/:filmID
// @description     Add a showtime on a particular film
// @access          Admin
router.post(
    '/:id',
    [
        auth,
        [
            check('day', 'Une date est requise').not().isEmpty(),
            check('hour', 'Une heure est requise').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let showtime = await Showtime.findOne({
                day: req.body.day,
                hour: req.body.hour,
                film: req.params.id,
            });
            if (showtime) {
                return res.status(400).send('Une séance existe déjà à cet horaire pour ce film');
            }

            showtime = new Showtime({
                day: req.body.day,
                hour: req.body.hour,
                film: req.params.id,
            });

            await showtime.save();
            return res.status(201).json(showtime);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);

// @route           GET /api/showtimes/:filmID
// @description     Get all showtimes of a film
// @access          Public
router.get('/:id', async (req, res) => {
    try {
        let showtimes = await Showtime.find({ film: req.params.id });
        return res.status(200).json(showtimes);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

// @route           DELETE /api/showtimes/:showtimeID||:filmID
// @description     Delete a showtime / Delete all showtimes from a movie being deleted
// @access          Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let showtime = await Showtime.findOne({ _id: req.params.id });
        if (showtime && req.user.isAdmin === true) {
            await Showtime.deleteOne({ _id: req.params.id });
            return res.status(202).json('La séance a été supprimée');
        }
        showtime = await Showtime.find({ film: req.params.id });
        if (showtime && req.user.isAdmin === true) {
            await Showtime.deleteMany({ film: req.params.id });
            return res.status(202).json(`Toutes les séances du film ${req.params.id} ont été supprimées`);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
