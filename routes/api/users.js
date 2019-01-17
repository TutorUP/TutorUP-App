const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Validation
const validateRegisterInput = require('../../validation/registerAuth');
const validateLoginInput = require('../../validation/loginAuth');

// Load User model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post('/register', async (req, res, next) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) return res.status(400).json(errors);

    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        }
        else {
            // TODO: add avatar to user
            let avatar = 'Avatar here';

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            
            // Generate hashed passwMediaKeySystemAccess
            bcrypt.genSalt(parseInt(keys.saltRounds), (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.error(err));
                });
            });
        }
    }
    catch (err) {
        console.error(err);
    }
});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    
    // Check Validation
    if (!isValid) return res.status(400).json(errors);
    
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }
        
        // Check password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
                // User Matched
                const payload = { id: user.id, 
                                name: user.name, 
                                avatar: user.avatar }; // Create JWT Payload
                
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) console.error(err);
                        res.json({
                            success: true,
                            token: `Bearer ${token}`
                        });
                    }
                );
            }
            else {
                errors.password = 'Incorrect password';
                return res.status(404).json(errors);
            }
        })
        .catch(err => console.error(`Password not authenticated by bcrypt login: ${err}`));
    }
    catch (err) {
        console.error(err);
    }
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
   res.json({
       id: req.user.id,
       name: req.user.name,
       email: req.user.email
   }); 
});

module.exports = router;