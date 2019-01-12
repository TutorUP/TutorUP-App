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
       required: true,
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
    status: {
        type: String,
        required: true
    },
    classes: {
        type: [String],
        required: true
    },
    isTutor: {
        type: Boolean
    },
    phone: {
        type: Number
    },
    availability: {
        from: {
            type: Number,

        },
        to: {
            type: Number,
         
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);