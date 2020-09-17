const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    classification: {
        type: String,
        required: true,
    },
    release: {
        type: Date,
        required: true,
    },
    showtimes: {
        type: Array,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    // snap: {
    //     type: String,
    //     required: true,
    // },
    synopsis: {
        type: String,
        required: true,
    },
});

module.exports = Film = mongoose.model('Film', FilmSchema);
