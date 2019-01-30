const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: add payment or not

const CourseSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    number: {
       type: Number,
       required: true,
       length: 3 
    },
    name: {
        type: String,
        required: true,
        max: 50
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = Course = mongoose.model('course', CourseSchema);