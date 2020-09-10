const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
    title: {
        type: String,
        required,
    },
    director: {
        type: String,
        required,
    },
    duration: {
        type: String,
        required,
    },
    genre: {
        type: String,
        required,
    },
    public: {
        type: String,
        required,
    },
    onScreenDate: {
        type: Date,
        required,
    },
    showtimes: {
        type: Date,
        required,
    },
    poster: {
        type: String,
        required,
    },
    snap: {
        type: String,
        required,
    },
    synopsis: {
        type: String,
        required,
    },
});

module.exports = Film = mongoose.model('Film', FilmSchema);
