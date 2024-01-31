const User = require("../models/User");
const { sendingSignupCode } = require("../services/auth.service");

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

module.exports = {
  signup,
  sendCode,
};
