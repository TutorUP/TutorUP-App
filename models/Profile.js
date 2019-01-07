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
    date: {
        type: Date,
        default: Date.now
    }
    
    
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);