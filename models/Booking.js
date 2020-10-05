const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    showtimeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'showtimes',
    },
    selectedSeats: {
        type: Array,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    filmID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'films',
    },
});

module.exports = Booking = mongoose.model('Booking', BookingSchema);
