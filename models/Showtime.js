const mongoose = require('mongoose');

const ShowtimeSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    film: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'films',
    },
});

module.exports = Showtime = mongoose.model('Showtime', ShowtimeSchema);
