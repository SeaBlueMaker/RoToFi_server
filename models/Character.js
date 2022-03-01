const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  sex: {
    type: String,
  },
  age: {
    type: String,
  },
  appearance: {
    type: String,
  },
  personality: {
    type: String,
  },
  etc: {
    type: String,
  },
  imageURL: {
    type: String,
  },
});

module.exports = mongoose.model("Character", characterSchema);
