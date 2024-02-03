const User = require("../models/User");
const Employee = require("../models/Employee");
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

    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

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

    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

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

async function getEmployeeById(req, res, next) {
  const userId = req["user"]._id;

  try {
    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    req["employee"] = {
      userInfo: req["user"],
      ...employee.toObject(),
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateWorkSchedule(req, res, next) {
  const userId = req.params.id;
  const { workSchedule } = req.body;

  try {
    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.workSchedule = workSchedule || employee.workSchedule;

    req["employee"] = await employee.save();
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteOne,
  getEmployeeById,
  updateWorkSchedule,
};
