const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  projects: [{
    type: ObjectId,
  }],
});

module.exports = mongoose.model("User", userSchema);
