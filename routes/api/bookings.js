const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Booking = require('../../models/Booking');
const Showtime = require('../../models/Showtime');
const auth = require('../../middleware/auth');

// @route           POST api/auth
// @description     Login user & get token
// @access          Public
router.post(
    '/:id',
    [auth, check('selectedSeats', 'Des ID de places sont requis').not().isEmpty()],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        try {
            const seats = req.body.selectedSeats;
            for (let i = 0; i < seats.length; i++) {
                const findSeat = await Booking.findOne({ selectedSeats: seats[i] });
                if (findSeat) {
                    throw new Error(`Le siège ${seats[i]} a déjà été réservé`);
                }
            }

            const showtime = await Showtime.findOne({ _id: req.params.id });
            const bookingSeats = new Booking({
                showtimesID: req.params.id,
                selectedSeats: seats,
                userID: req.user.id,
                filmID: showtime.film,
            });

            const save = await bookingSeats.save();
            return res.status(201).json(save);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;
