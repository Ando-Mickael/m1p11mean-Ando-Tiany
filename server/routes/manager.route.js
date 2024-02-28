const router = require("express").Router();
const appointmentController = require("../controllers/appointment.controller");

// daily appointments by month and year
router.get(
  "/total-monthly-appointments",
  appointmentController.totalMonthlyAppointments
);

router.get(
  "/monthly-appointments",
  appointmentController.monthlyAppointmentsByYear
);

module.exports = router;
