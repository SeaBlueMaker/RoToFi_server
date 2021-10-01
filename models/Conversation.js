const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const conversationSchema = mongoose.Schema({
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

module.exports = mongoose.model("Conversation", conversationSchema);
