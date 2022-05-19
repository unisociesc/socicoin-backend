const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const VoteSchema = new mongoose.Schema({
    prevHash:{
        type: String,
        require: false
    },
    hash:{
        type: String,
        require: true
    },
    index: {
        required: true,
        type: Number
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    candidate:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;