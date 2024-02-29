const Appointment = require("../models/Appointment");
const SpecialOffer = require("../models/SpecialOffers");

async function getDailyAppointmentsByMonthAndYear(year, month) {
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

async function getAppointmentsForReminder(userId) {
  const now = new Date();

  const endOfTomorrow = new Date();
  endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);
  endOfTomorrow.setHours(23, 59, 59, 999);

  const appointments = await Appointment.find({
    userId,
    date: { $gte: now, $lte: endOfTomorrow },
  });

  return appointments;
}

async function getMonthlyAppointmentsByYear(year) {
  const startOfYear = new Date(year, 0, 1); // January 1st
  const endOfYear = new Date(year, 11, 31); // December 31st

  try {
    const result = await Appointment.aggregate([
      {
        $match: {
          date: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          count: { $sum: 1 },
        },
      },
    ]);

    const appointmentsByMonth = Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      count: 0,
    }));

    result.forEach((item) => {
      appointmentsByMonth[item._id - 1].count = item.count;
    });

    return appointmentsByMonth;
  } catch (error) {
    console.error("Error fetching appointments by year:", error);
    throw error;
  }
}

async function getTotalPrice(services, date) {
  let totalPrice = 0;

  const specialOffer = await SpecialOffer.findOne({
    startDate: { $lte: new Date(date) },
    endDate: { $gte: new Date(date) },
  });

  if (specialOffer) {
    for (let index = 0; index < services.length; index++) {
      const serviceId = services[index]._id.toString();
      const percentage = specialOffer.percentages.get(serviceId);

      if (percentage) {
        totalPrice += (services[index].price * percentage) / 100;
      } else {
        totalPrice += services[index].price;
      }
    }
  } else {
    for (let index = 0; index < services.length; index++) {
      totalPrice += services[index].price;
    }
  }

  return totalPrice;
}

module.exports = {
  getDailyAppointmentsByMonthAndYear,
  getAppointmentsForReminder,
  getMonthlyAppointmentsByYear,
  getTotalPrice,
};
