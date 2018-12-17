const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load User model
const User = require('../../models/User');

const validateRegisterInput = require('../../validation/registerAuth');
const validateLoginInput = require('../../validation/loginAuth');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res, next) => res.json({ msg:'Users Route Works'}));

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post('/register', (req, res, next) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check validation
    if (!isValid) return res.status(400).json(errors);
    
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        }
        else {
            
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isTutor: true
            });
            
            bcrypt.genSalt(parseInt(process.env.saltRounds), (err, salt) => {
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
    });
});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const email = req.body.email;
    const password = req.body.password;
    
    // Find user by email
    User.findOne({ email })
        .then(user => {
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // User Matched
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
                        
                        jwt.sign(
                            payload,
                            process.env.secretOrKey,
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
        })
        .catch(err => console.error(err));
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