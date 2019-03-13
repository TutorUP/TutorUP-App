const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Load validation
const validateProfileInput = require('../../validation/profileValidation');

// @route   GET api/profile/all
// @desc    Get all users' profiles
// @access  Public
router.get('/all', async (req, res) => {
    const errors = {};
    try {
        const profiles = await Profile.find(
            { disabled: false }
        ).populate({
            path: 'user',
            select: ['firstname', 'lastname', 'email', 'isAdmin']
        });

        if (!profiles) {
            errors.noprofile = 'This user has not created a profile';
            return res.status(404).json();
        }
        res.json(profiles);
    }
    catch (err) {
        res.status(404).json({ profile: 'Error retrieving profile' });
    }
});

// @desc    Get all users' profiles
// @access  Admin
router.get('/allUsers', async (req, res) => {
    const errors = {};
    try {
        const profiles = await Profile.find().populate({
            path: 'user',
            select: ['firstname', 'lastname', 'email', 'isAdmin']
        });

        if (!profiles) {
            errors.noprofile = 'This user has not created a profile';
            return res.status(404).json();
        }
        res.json(profiles);
    }
    catch (err) {
        res.status(404).json({ profile: 'Error retrieving profile' });
    }
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', async (req, res) => {
    const errors = {};
    try {
        const profile = await Profile.findOne({ handle: req.params.handle })
            .populate('user', ['firstname', 'lastname', 'email', 'isAdmin']);
        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        res.json(profile);

    }
    catch (err) {
        res.status(404).json(err);
    }
  });

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const errors = {};
    try {
        const profile =  await Profile.findOne({ user: req.user.id })
            .populate('user', ['isAdmin']);
        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }
        res.json(profile);
    }
    catch (err) {
        res.status(404).json(err);
    }
});


// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id; 

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.major) profileFields.major = req.body.major;
    if (req.body.minor) profileFields.minor = req.body.minor;
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.courses) profileFields.courses = req.body.courses;
    profileFields.bio = req.body.bio ? req.body.bio : '';
    profileFields.availability = req.body.availability ? req.body.availability : '';


    Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
            // Update profile
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            ).then(profile => res.json(profile));
        }
        // Profile not found
        else {
            Profile.findOne({ handle: profileFields.handle }).then(profile => {
                new Profile(profileFields).save().then(profile => res.json(profile));
            });
        }
    });
});

router.post('/disableProfile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        console.log(req.body.profileId)
        const profile = await Profile.findOneAndUpdate(
            { _id: req.body.profileId},
            { $set: { disabled: true }}
        ).then(profile => res.json(profile));
    }
    catch (err) {
        console.error(err);

    }
});

router.post('/enableProfile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        console.log(req.body.profileId)
        const profile = await Profile.findOneAndUpdate(
            { _id: req.body.profileId},
            { $set: { disabled: false }}
        ).then(profile => res.json(profile));
    }
    catch (err) {
        console.error(err);
    }
});

// @route   DELETE api/profile
// @desc    Delete user and profile of current logged in user
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

// @route   DELETE api/profile/id
// @desc    Delete user and profile by id (for admin)
// @access  Private
router.delete('/id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOneAndRemove({ _id: req.body.id.profile }).then(() => {
        User.findOneAndRemove({ _id: req.body.id.user }).then(() =>
          res.json({ success: true })
        );
      });
    }
);

module.exports = router;