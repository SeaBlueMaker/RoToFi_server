const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const dialogue = mongoose.Schema({
  character: {
    type: ObjectId,
    ref: "Character",
  },
  script: {
    type: String,
  },
});

const plotSchema = mongoose.Schema({
  isTimeFlag: {
    type: Boolean,
  },
  situation: {
    type: String,
  },
  location: {
    title: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  dialogues: [dialogue],
});

module.exports = mongoose.model("Plot", plotSchema);
