const User = require("../Models/user.model");
const { hash, hashcmp } = require("../Utils/hash");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res
        .status(400)
        .json({ message: "User already exists with the email" });
    }

    const user = new User({
      name,
      email,
      password: await hash(password),
      contacts: [],
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (await hashcmp(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, userId: user._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.status(200).json({ token, message: "Login successful" });
    }
    res.status(400).json({ message: "Invalid credentials" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addContact = async (req, res) => {
  const { userid, email } = req.body;
  try {
    const user = await User.findById(userid);
    const contact = await User.findOne({ email: email });
    if (!contact) {
      return res.status(400).json({ message: "Contact not found" });
    }
    user.contacts.push(contact._id);
    await user.save();
    res.status(200).json({ message: "Contact added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login, addContact };
