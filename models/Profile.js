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
    education: [{
        major: {
            type: String,
            required: true
        },
        minor: {
            type: String
        }

    }],

    status: {
        type: String,
        required: true
    },
    classes: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    isTutor: {
        type: Boolean
    },
    availability: {
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
    
    
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);