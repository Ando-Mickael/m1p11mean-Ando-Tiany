const router = require("express").Router();
const appointmentController = require("../controllers/appointment.controller");

router.get(
  "/total-monthly-appointments",
  appointmentController.totalMonthlyAppointments
);

module.exports = router;
