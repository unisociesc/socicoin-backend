const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const CandidateSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    code:{
        type: String,
        require: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;