const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// Load routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors())
app.use(helmet());

// Normal express middleware config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to DB
mongoose
    .set('useNewUrlParser', true)
    .connect(process.env.mongoURI)
    .then(() => console.info('MongoDB Connected'))
    .catch(err => console.error(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/userAuth')(passport);

app.use('/test', (req, res) => {
    res.send('Test worked.');
});

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => console.info(`Server started on port ${port}`));
