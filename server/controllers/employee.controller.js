const User = require("../models/User");
const Employee = require("../models/Employee");
const mongoose = require("mongoose");


async function findAll(req, res) {
  try {
    const employees = await Employee.find()
        .populate({
          path: 'userId',
          model: 'User',
          select: 'email password role firstName lastName createdAt updatedAt __v picture birthday preferences',
        })
        .exec();

    const result = employees.map(employee => {
      const user = employee.userId;

      // Calculate the total duration of work for the week
      const { totalWorkDuration, averageWorkDuration } = calculateWorkDurations(employee.workSchedule);

      const resultObj = {
        _id: user._id,
        email: user.email,
        password: user.password,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        __v: user.__v,
        picture: user.picture,
        birthday: user.birthday,
        preferences: user.preferences,
        workSchedule: employee.workSchedule || [],
        totalWorkDuration: totalWorkDuration,
        averageWorkDuration: averageWorkDuration,
      };

      return resultObj;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Helper function to calculate the total and average duration of work for the week
function calculateWorkDurations(workSchedule) {
  let totalDuration = 0;

  for (const daySchedule of workSchedule) {
    // Assuming start and end times are in HH:mm format
    const startTime = new Date(`1970-01-01T${daySchedule.startTime}`);
    const endTime = new Date(`1970-01-01T${daySchedule.endTime}`);

    // Calculate the duration in milliseconds
    const duration = endTime - startTime;

    // Add the duration to the total
    totalDuration += duration;
  }

  // Calculate the average duration per day (assuming 5 working days)
  const averageDuration = totalDuration / (5 * 1000 * 60 * 60);

  // Convert the total duration to hours and minutes
  const totalHours = Math.floor(totalDuration / (1000 * 60 * 60));
  const totalMinutes = Math.floor((totalDuration % (1000 * 60 * 60)) / (1000 * 60));

  // Convert the average duration to hours and minutes
  const averageHours = Math.floor(averageDuration);
  const averageMinutes = Math.floor((averageDuration % 1) * 60);

  // Format the results as HH:mm
  const formattedTotalDuration = `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}`;
  const formattedAverageDuration = `${String(averageHours).padStart(2, '0')}:${String(averageMinutes).padStart(2, '0')}`;

  return {
    totalWorkDuration: formattedTotalDuration,
    averageWorkDuration: formattedAverageDuration,
  };
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
