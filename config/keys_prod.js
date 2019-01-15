module.exports = {
    mongoURI: process.env.MONGO_URI,
    sessionSecret: '',
    secretOrKey: process.env.SECRET_OR_KEY,
    saltRounds: 5,
    AUTH0_CLIENTID=process.env,
    AUTH0_DOMAIN=process.env,
    AUTH0_CLIENT_SECRET=process.env
};
  