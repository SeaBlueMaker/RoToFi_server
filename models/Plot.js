const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const location = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const conversation = mongoose.Schema({
  creator: {
    type: ObjectId,
    required: true,
    ref: "Character",
  },
  script: {
    type: String,
    required: true,
  },
});

const plotSchema = mongoose.Schema({
  isTimeFlag: {
    type: Boolean,
    required: true,
  },
  situation: {
    type: String,
    required: true,
  },
  location: location,
  conversations: [conversation],
});

module.exports = mongoose.model("Plot", plotSchema);
