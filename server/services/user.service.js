const { getAppointmentsForReminder } = require("./appointment.service");
const { getTodayOffers } = require("./specialOffers.service");

async function getTodayNotifications(userId) {
  let notifications = [];
  const appointments = await getAppointmentsForReminder(userId);
  const offers = await getTodayOffers();

  appointments.map((appointment) => {
    notifications.push({
      type: "appointment",
      date: appointment.date,
      id: appointment.id,
    });
  });

  offers.map((offer) => {
    notifications.push({
      type: "offer",
      date: offer.startDate,
      id: offer.id,
    });
  });

  // sort desc by date
  notifications.sort((a, b) => b.date - a.date);

  return notifications;
}

module.exports = {
  getTodayNotifications,
};
