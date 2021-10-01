const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const world = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  world: world,
  plots: [ObjectId],
  characters: [ObjectId],
});

module.exports = mongoose.model("Project", projectSchema);
