const Appointment = require("../models/Appointment");
const User = require("../models/User");
const {
  getDailyAppointmentsByMonthAndYear,
  getMonthlyAppointmentsByYear,
  getTotalPrice,
} = require("../services/appointment.service");

const getAppointments = async (req, res, next) => {
  try {
    req.appointments = await Appointment.find()
      .populate({
        path: "userId",
        select: "_id firstName lastName",
      })
      .populate({
        path: "employeeId",
        select: "_id firstName lastName",
      })
      .populate({
        path: "serviceIds", // Update to serviceIds
        select: "name price duration commissionRate",
      });
    next();
  } catch (error) {
    console.error("Error getting appointments", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAppointmentsByUserId = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let appointments;

    if (user.role === "client") {
      // If the user is a client, get appointments where userId = id
      appointments = await Appointment.find({ userId })
        .populate({
          path: "userId",
          select: "_id firstName lastName",
        })
        .populate({
          path: "employeeId",
          select: "_id firstName lastName",
        })
        .populate({
          path: "serviceIds", // Update to serviceIds
          select: "name price duration commissionRate",
        });
    } else if (user.role === "employee") {
      // If the user is an employee, get appointments where employeeId = id
      appointments = await Appointment.find({ employeeId: userId })
        .populate({
          path: "userId",
          select: "_id firstName lastName",
        })
        .populate({
          path: "employeeId",
          select: "_id firstName lastName",
        })
        .populate({
          path: "serviceIds", // Update to serviceIds
          select: "name price duration commissionRate",
        });
    } else {
      return res.status(400).json({ error: "Invalid user role" });
    }

    req.appointments = appointments;
    next();
  } catch (error) {
    console.error("Error getting appointments by user ID", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function create(req, res) {
  const newAppointment = new Appointment(req.body);

  try {
    const createdAppointment = await newAppointment.save();
    res.status(201).json(createdAppointment);
  } catch (error) {
    console.error("Error creating appointment", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getMonthlyIncome(req, res, next) {
  try {
    const { year } = req.params;

    const allAppointments = await Appointment.find({
      status: "confirmed",
    });

    // Filter appointments for the specified year
    const filteredAppointments = allAppointments.filter((appointment) => {
      const appointmentYear = new Date(appointment.date).getFullYear();
      return appointmentYear.toString() === year;
    });

    // Calculate monthly income
    const monthlyIncome = filteredAppointments.reduce((result, appointment) => {
      const month = new Date(appointment.date).getMonth() + 1; // Month is 0-indexed
      const totalIncome = appointment.totalPrice || 0;

      if (!result[month]) {
        result[month] = { month, totalIncome };
      } else {
        result[month].totalIncome += totalIncome;
      }

      return result;
    }, {});

    req.income = Object.values(monthlyIncome).sort((a, b) => a.month - b.month);
    next();
  } catch (error) {
    console.error("Error in getMonthlyIncome:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getDailyIncome(req, res, next) {
  try {
    const { year, month } = req.params;

    const allAppointments = await Appointment.find({
      status: "confirmed",
    });

    // Filter appointments for the specified year and month
    const filteredAppointments = allAppointments.filter((appointment) => {
      const appointmentYear = new Date(appointment.date).getFullYear();
      const appointmentMonth = new Date(appointment.date).getMonth() + 1; // Month is 0-indexed
      return (
        appointmentYear.toString() === year &&
        appointmentMonth.toString() === month
      );
    });

    // Calculate daily income
    const dailyIncome = filteredAppointments.reduce((result, appointment) => {
      const day = new Date(appointment.date).getDate();
      const totalIncome = appointment.totalPrice || 0;

      if (!result[day]) {
        result[day] = { day, totalIncome };
      } else {
        result[day].totalIncome += totalIncome;
      }

      return result;
    }, {});

    req.income = Object.values(dailyIncome).sort((a, b) => a.day - b.day);
    next();
  } catch (error) {
    console.error("Error in getDailyIncome:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function calculateMonthlyRevenue(req, res, next) {
  try {
    const incomeResult = req.income;
    const expenseResult = req.expenses;

    req.revenue = calculateRevenue(incomeResult, expenseResult);
    next();
  } catch (error) {
    console.error("Error in calculateMonthlyRevenue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function calculateDailyRevenue(req, res, next) {
  const incomeResult = req.income;
  const expenseResult = req.expenses;

  const revenue = [];

  // Determine the number of days in the month (adjust this based on your needs)
  const numberOfDaysInMonth = 31;

  for (let day = 1; day <= numberOfDaysInMonth; day++) {
    const income = incomeResult.find((item) => item.day === day);
    const expense = expenseResult.find((item) => item.day === day);

    const totalIncome = income ? income.totalIncome : 0;
    const totalExpense = expense ? expense.totalAmount : 0;
    const totalCommission = expense ? expense.totalCommission : 0;

    const netRevenue = totalIncome - totalExpense - totalCommission;

    revenue.push({ day, totalRevenue: netRevenue });
  }

  req.revenue = revenue;
  next();
}

function calculateRevenue(incomeResult, expenseResult) {
  // Assuming both incomeResult and expenseResult are arrays with objects containing { month, totalIncome } or { day, totalExpense }
  console.log("income", incomeResult);
  console.log("expense", expenseResult);
  const revenue = [];

  for (
    let i = 0;
    i < Math.max(incomeResult.length, expenseResult.length);
    i++
  ) {
    const monthOrDay = i + 1;

    const income = incomeResult.find((item) => item.month === monthOrDay);
    const expense = expenseResult.find(
      (item) => item.month === monthOrDay || item.day === monthOrDay
    );

    const totalIncome = income ? income.totalIncome : 0;
    const totalExpense = expense ? expense.totalAmount : 0; // Corrected line

    const netRevenue = totalIncome - totalExpense;

    revenue.push({ month: monthOrDay, totalRevenue: netRevenue });
  }

  return revenue;
}

async function getByUserId(req, res) {
  const { userId } = req.params;

  try {
    const appointments = await Appointment.find({ userId }).populate(
      "serviceIds"
    );
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function confirmedAppointment(req, res) {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id).populate("serviceIds");

    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
    }
    appointment.status = "confirmed";
    const totalPrice = await getTotalPrice(
      appointment.serviceIds,
      appointment.date
    );
    appointment.totalPrice = totalPrice;

    await appointment.save();

    res.status(200).json({ message: "Appointment confirmed successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function dailyAppointmentsByMonthAndYear(req, res) {
  const { year, month } = req.query;
  try {
    getDailyAppointmentsByMonthAndYear(Number(year), Number(month)).then(
      (data) => {
        res.json(data);
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function monthlyAppointmentsByYear(req, res) {
  const { year } = req.query;

  try {
    const allAppointments = await getMonthlyAppointmentsByYear(Number(year));

    res.json(allAppointments);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getAppointments,
  getAppointmentsByUserId,
  getMonthlyIncome,
  getDailyIncome,
  calculateMonthlyRevenue,
  calculateDailyRevenue,
  create,
  getByUserId,
  confirmedAppointment,
  dailyAppointmentsByMonthAndYear,
  monthlyAppointmentsByYear,
};
