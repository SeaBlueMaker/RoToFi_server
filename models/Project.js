const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  world: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  plots: [ObjectId],
  characters: [{
    type: ObjectId,
    ref: "Character",
  }],
});

module.exports = mongoose.model("Project", projectSchema);
