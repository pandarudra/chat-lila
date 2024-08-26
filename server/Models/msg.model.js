const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const msgSchema = new mongoose.Schema(
  {
    chatid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Msg = mongoose.model("Msg", msgSchema);
module.exports = Msg;
