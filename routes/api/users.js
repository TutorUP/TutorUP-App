const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const toonavatar = require('cartoon-avatar');

// Load email confirmation functions
const sendEmail = require('../../email/email.send');
const msgs = require('../../email/email.msgs');
const templates = require('../../email/email.templates');


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

        // New user
        else {
            // Add avatar to user from email
            const avatar = toonavatar.generate_avatar();

            const newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            
            // Generate hashed password
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

            sendEmail(newUser.email, templates.confirm(newUser._id));
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
                                firstname: user.firstname,
                                lastname: user.lastname,
                                avatar: user.avatar,
                                email: user.email,
                                confirmed: user.confirmed
                            }; // Create JWT Payload
                
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
       firstname: req.user.firstname,
       lastname: req.user.lastname,
       email: req.user.email
   }); 
});

module.exports = router;