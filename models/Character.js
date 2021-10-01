const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  appearance: {
    type: String,
    required: true,
  },
  personality: {
    type: String,
    required: true,
  },
  etc: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Character", characterSchema);
