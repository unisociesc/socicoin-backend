const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    voted:{
        type: Boolean,
        require: true,
        default: false,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    passwordResetToken:{
        type: String,
        select: false,
    },
    passwordResetExpires:{
        type: Date,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    votedAt:{
        type: Date
    }
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    //console.log(hash);
    next();
});



const User = mongoose.model('User', UserSchema);

module.exports = User;