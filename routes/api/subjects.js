const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Subject = require('../../models/Subject');

// Load validation
const validateSubjectInput = require('../../validation/subjectValidation');

// @route   GET api/subjects
// @desc    Get all subjects
// @access  Private
router.get('/', async (req, res) => {
    const errors = {};

    try {
        const subjects = await Subject.find().populate('subjects', ['id', 'name', 'isMajor', 'isMinor']);
        if (!subjects) {
            errors.nosubjects = 'There are currently no subjects';
            return res.status(404).json();
        }
        res.json(subjects);
    }
    catch (err) {
        res.status(404).json({ subjects: 'Error retrieving subjects' });
    }
});

// @route   POST api/subjects
// @desc    Create or edit a subject
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    for (var i = 0; i < req.body.subjects.length; i++) {
        const subject = req.body.subjects[i];

        const { errors, isValid } = validateSubjectInput(subject);

        // // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const subjectFields = {};
        for (var key in subject) {
            if (subject[key]) subjectFields[key] = subject[key].trim();
        }
        subjectFields.id = subject.id ? subject.id.trim() : '';

        console.log(subjectFields);

        // See if there is already a subject with the subject ID
        Subject.findOne({ _id: subject._id }).then(subject => {
            if (subject) {
                // Subject already exists
                Subject.findOneAndUpdate(
                    { _id: subject._id },
                    { $set: subjectFields },
                    { new: true }
                ).then(subject => res.json(subject));
            }
            // Subject does not already exist
            else {
                new Subject(subjectFields).save().then(subject => res.json(subject));
            }
        });
    }
    
});

// @route   DELETE api/subjects
// @desc    Delete a subject by id
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
      Subject.findOneAndRemove({ id: req.body.id }).then(() => res.json({ success: true }));
    }
);

module.exports = router;