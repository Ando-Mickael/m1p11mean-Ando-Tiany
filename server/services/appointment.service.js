const Appointment = require("../models/Appointment");

async function getMonthlyAppointments(year, month) {
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0);

  try {
    const result = await Appointment.aggregate([
      {
        $match: {
          date: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: "$date" },
          count: { $sum: 1 },
        },
      },
    ]);

    const appointmentsByDay = Array.from(
      { length: endOfMonth.getDate() },
      (_, index) => ({
        day: index + 1,
        count: 0,
      })
    );

    result.forEach((item) => {
      appointmentsByDay[item._id - 1].count = item.count;
    });

    return appointmentsByDay;
  } catch (error) {
    console.error("Error fetching monthly appointments:", error);
    throw error;
  }
}

module.exports = {
  getMonthlyAppointments,
};
