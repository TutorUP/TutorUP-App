const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Course = require('../../models/Course');

// Load validation
const validateCourseInput = require('../../validation/courseValidation');

// @route   GET api/courses
// @desc    Get all courses for current logged in user
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const errors = {};
    try {
        const courses =  await Course.find({ user: req.user.id });
        if (!courses) {
            errors.nocourses = 'There are no courses for this user';
            return res.status(404).json(errors);
        }
        res.json(courses);
    }
    catch (err) {
        res.status(404).json(err);
    }
});

// @route   POST api/course
// @desc    Create or edit a course on a profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // const { errors, isValid } = validateCourseInput(req.body);

    console.log('Req body')
    console.log(req.body[0])


    // Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
    
    // Get fields
    const courseFields = {};
    courseFields.user = req.user.id;
    if (req.body[0].courseId) courseFields.id = req.body[0].courseId;
    if (req.body[0].courseNumber) courseFields.number = req.body[0].courseNumber;
    if (req.body[0].courseName) courseFields.name = req.body[0].courseName;

    // See if there is already a CS 203 for user id X
    Course.findOne({ user: req.user.id }).then(course => {
        if (course) {
            // Course already exists for user profile
            Course.findOneAndUpdate(
                { user: req.user.id },
                { $set: courseFields },
                { new: true }
            ).then(course => res.json(course));
        }
        // User does not already have course
        else {
            new Course(courseFields).save().then(course => res.json(course));
        }
    });
});

// @route   DELETE api/course
// @desc    Delete course from user profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      });
    }
);

module.exports = router;