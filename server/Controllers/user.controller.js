const User = require("../Models/user.model");
const { hash, hashcmp } = require("../Utils/hash");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      {
        res.status(400).json({ message: "User already exists with the email" });
      }
    }
    const newPass = await hash(password);
    const user = new User({
      name,
      email,
      password: newPass,
      contacts: [],
    });
    console.log(user);
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
        { email: user.email, userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
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
    const contact = await User.find({ email: email });
    if (!contact) {
      return res.status(400).json({ message: "Contact not found" });
    }
    user.contacts.push(contact[0]._id);
    await user.save();
    res.status(200).json({ message: "Contact added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login, addContact };
