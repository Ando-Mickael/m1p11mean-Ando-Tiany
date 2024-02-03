const User = require("../models/User");
const mongoose = require("mongoose");

async function findAll(req, res) {
  try {
    const users = await User.find({
      role: "employee",
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function findOne(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(id),
      role: "employee",
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function create(req, res) {
  const { firstName, lastName, birthday, email, password } = req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      birthday: new Date(birthday),
      email,
      password,
      role: "employee",
    });

    const savedUser = await newUser.save();

    res.json({
      message: "User Created",
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function update(req, res) {
  const { firstName, lastName, birthday } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthday = new Date(birthday);
    user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteOne(req, res) {
  const { id } = req.params;

  try {
    await User.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    res.json({ message: "User Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteOne,
};
