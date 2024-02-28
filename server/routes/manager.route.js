const router = require("express").Router();
const appointmentController = require("../controllers/appointment.controller");

router.get(
  "/daily-appointments-by-month-and-year",
  appointmentController.dailyAppointmentsByMonthAndYear
);

router.get(
  "/monthly-appointments",
  appointmentController.monthlyAppointmentsByYear
);

module.exports = router;
