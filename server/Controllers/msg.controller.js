const Chat = require("../Models/chat.model");
const User = require("../Models/user.model");

const Msg = require("../Models/msg.model");
let io;

const setIo = (newIo) => {
  io = newIo;
};
const sendmsg = async (req, res) => {
  const { chatid, senderid, receiverid, msg } = req.body;

  try {
    const chat = await Chat.findById(chatid);
    const sender = await User.findById(senderid);
    const receiver = await User.findById(receiverid);

    if (!chat || !sender || !receiver) {
      return res.status(404).json({ message: "Chat or user not found" });
    }

    if (!chat.users.includes(senderid) || !chat.users.includes(receiverid)) {
      return res.status(400).json({ message: "User not part of the chat" });
    }

    const message = new Msg({
      chatid: chatid,
      sender: senderid,
      message: msg,
    });

    await message.save();
    chat.msgs.push(message._id);
    await chat.save();
    io.to(chatid).emit(`msg-${chatid}`, message);

    res.status(201).json({ message });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};

const getmsg = async (req, res) => {
  const { chatid } = req.params;
  const { page = 1, limit = 20 } = req.query;

  try {
    const chat = await Chat.findById(chatid).populate({
      path: "msgs",
      options: {
        sort: { createdAt: 1 },
        skip: (page - 1) * limit,
        limit: parseInt(limit),
      },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ messages: chat.msgs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendmsg, getmsg, setIo };
