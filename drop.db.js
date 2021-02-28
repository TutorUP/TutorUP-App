const mongoose = require("mongoose");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI, () => {
  mongoose.connection.db.dropDatabase().then(() => process.exit());
});

console.log("TutorUP database dropped");
