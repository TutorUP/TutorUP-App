const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: add payment or not

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
       type: String,
       max: 40 
    },
    major: {
        type: String,
        required: true
    },
    minor: {
        type: String
    },
    bio: {
        type: String,
        max: 300
    },
    isTutor: {
        type: Boolean
    },
    phone: {
        type: Number
    },
    availability: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

ProfileSchema.index({
    name: 'text',
    description: 'text'
}, {
    weights: {
        user: 5,
        bio: 1
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);