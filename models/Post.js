const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    name: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    message: {
        type: String,
        required: true,
    },
});

module.exports = Post = mongoose.model('Post', PostSchema);
