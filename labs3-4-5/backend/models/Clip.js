const mongoose = require('mongoose');

const ClipSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    },
    song: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Clip', ClipSchema);

