const Auth0Strategy = require('passport-auth0');
const keys = require('../config/keys');

// Configure passport to use Auth0
module.exports = passport => { new Auth0Strategy({
        domain: keys.AUTH0_DOMAIN,
        clientID: keys.AUTH0_CLIENTID,
        clientSecret: keys.AUTH0_CLIENT_SECRET,
        callbackURL: keys.AUTH0_CALLBACK_URL || 'http://localhost:5000/dashboard'
    }, (accessToken, refreshToken, extraParams, profile, done) => {
        return done(null, profile);
    });
}