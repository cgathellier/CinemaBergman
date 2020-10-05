const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Booking = require('../../models/Booking');
const Showtime = require('../../models/Showtime');
const auth = require('../../middleware/auth');

// @route           POST api/booking/:id
// @description     Book seats (by showtime, film and user)
// @access          Private
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
                showtimeID: req.params.id,
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

// @route           GET api/booking/:id
// @description     Get booked seats
// @access          Public
router.get('/:id', async (req, res) => {
    try {
        const bookedSeats = await Booking.find({ showtimeID: req.params.id });
        res.status(200).json(bookedSeats);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
