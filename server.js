const compression = require("compression");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const setting = require("./config/checkProd");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const keys = require("./config/keys");

// Load routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const courses = require("./routes/api/courses");
const subjects = require("./routes/api/subjects");

const app = express();
const port = process.env.PORT || 8080;

// Use GZip compression
app.use(compression());
app.use(cors());
app.use(helmet());
// app.use(express.cookieParser());

// Email confirmation
const emailController = require("./email/email.controller");

// Normal express middleware config defaults
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.session({ secret: process.env.secretOrKey }));

// Connect to DB
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.info("MongoDB Connected"))
  .catch((err) => console.error(err));

// Config express-session
const sessConfig = {
  secret: keys.sessionSecret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessConfig));

// Passport Config
require("./config/userAuth")(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/courses", courses);
app.use("/api/subjects", subjects);
app.get("/email/confirm/:id", emailController.confirmEmail);

if (setting.isProduction) {
  sessConfig.cookie.secure = true;

  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () =>
  console.info(
    `Server started on port ${port} & Prod setting is ${setting.isProduction}`
  )
);

module.exports = app;
