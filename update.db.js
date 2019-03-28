const mongoose = require('mongoose');
const keys = require('./config/keys');

const User = require('./models/User');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

