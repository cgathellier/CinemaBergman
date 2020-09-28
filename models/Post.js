const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    film: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'films',
    },
    name: {
        type: String,
    },
    date: {
        type: Date,
    },
    message: {
        type: String,
        required: true,
    },
});

module.exports = Post = mongoose.model('Post', PostSchema);
