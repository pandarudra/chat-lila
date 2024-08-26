const Chat = require("../Models/chat.model");
const User = require("../Models/user.model");

const Msg = require("../Models/msg.model");

const sendmsg = async (req, res) => {
  const { chatid, senderid, reciverid, msg } = req.body;
  try {
    const chat = await Chat.findById(chatid);
    const sender = await User.findById(senderid);

    if (!chat || !sender) {
      return res.status(404).json({ message: "Chat not found" });
    }
    const message = new Msg({
      chatid: chatid,
      sender: senderid,
      message: msg,
    });
    await message.save();
    chat.msgs.push(message._id);
    await chat.save();
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getmsg = async (req, res) => {
  const { chatid } = req.params;
  try {
    const chat = await Chat.findById(chatid).populate("msgs");
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json({ messages: chat.msgs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { sendmsg };
