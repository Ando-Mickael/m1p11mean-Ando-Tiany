const User = require("../models/User");
const { sendingSignupCode } = require("../services/auth.service");
const jwt = require('jsonwebtoken');
require("dotenv").config();

async function signup(req, res) {
  const { email, password, firstName, lastName } = req.body;

  const newUser = new User({
    email,
    password,
    role: "client",
    firstName,
    lastName,
  });
  const savedUser = await newUser.save();

  res.json(savedUser);
}

function sendCode(req, res) {
  const { email } = req.body;

  const newCode = sendingSignupCode(email);

  res.json({ code: newCode });
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email ou Mot de Passe Invalide' });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou Mot de Passe Invalide' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.PRIVATE_KEY,
        { expiresIn: '5h' }
    );

    res.json({ token, userId: user._id, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  signup,
  sendCode,
  login
};
