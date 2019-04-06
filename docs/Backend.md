# Backend Notes : all code in root folder

### Technologies

- Express : Server and routing framework for Node.js
- Mongoose : Driver that allows us to model our database objects and make queries to MongoDB
- MLab : The cloud MongoDB database we are using
- Passport : Authentication package for protecting server routes, multiple auth Strategies can be used, we are using simple JWT authentication
- Validator : Easier server-side validation for user inputs
- JWT : Authentication strategy in which user creates a password, it gets hashed and saved to the database, and we decrypt the password when they attempt to login again

## TLDR

### server.js : Base of the backend functionality

- MongoDB connection made with Mongoose db driver module
- Connection with authentication method (we're using Passport)
- Snippet to deploy frontend after it is built for production

## Routing Structure:

```javascript
router.<get/post>('/myroute', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Deal with request and response
});
```

### /routes/api : Folder contains all routes we are using for our REST API

#### users ROUTE

- Register User
- Login User
- Get Current User

#### profile ROUTE

- Get All Profiles
- Get Profile by Handle
- Get A Profile for the current logged in user
- Create/Edit current user's profile
- Delete current user's profile

#### courses ROUTE

#### subjects ROUTE

## JWT Snippet

```javascript
// JWT auth snippet
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// Session secret (stored as environment variable, not hard coded)
opts.secretOrKey = "secret";

// Configure Passport to use JWT authentication
passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                // Return user data if found in database
                if (user) return done(null, user);
                return done(null, false);
            })
            .catch(err => console.error(err));
    });
```
