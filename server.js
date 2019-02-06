const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const keys = require('./config/keys');

// Load routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const courses = require('./routes/api/courses');
const subjects = require('./routes/api/subjects');
const posts = require('./routes/api/posts');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors())
app.use(helmet());
// app.use(express.cookieParser());

// Normal express middleware config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.session({ secret: process.env.secretOrKey }));

// Connect to DB
mongoose
    .connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => console.info('MongoDB Connected'))
    .catch(err => console.error(err));

// Config express-session
const sessConfig = {
    secret: keys.sessionSecret,
    cookie: {},
    resave: false,
    saveUninitialized: true
};

app.use(session(sessConfig));

// Passport Config
require('./config/userAuth')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/courses', courses);
app.use('/api/subjects', subjects);
app.use('/api/posts', posts);

if (process.env.NODE_ENV === 'production') {
    sessConfig.cookie.secure = true;

    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.info(`Server started on port ${port}`));

module.exports = app;
