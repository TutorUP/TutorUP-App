const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  id: {
    type: String,
    required: false,
    max: 5,
  },
  name: {
    type: String,
    required: true,
    max: 50,
  },
  isMajor: {
    type: String,
    required: true,
    max: 5,
  },
  isMinor: {
    type: String,
    required: true,
    max: 5,
  },
  isCourse: {
    type: String,
    required: true,
    max: 5,
  },
});

module.exports = Subject = mongoose.model("subjects", SubjectSchema);
