const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.virtual('fullName').get(function() {
    return this.firstname + ' ' + this.lastname;
});

module.exports = User = mongoose.model('users', UserSchema);