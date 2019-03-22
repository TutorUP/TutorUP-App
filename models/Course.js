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
    courseSubject: {
        type: String,
        required: true
    }
});

module.exports = Course = mongoose.model('course', CourseSchema);