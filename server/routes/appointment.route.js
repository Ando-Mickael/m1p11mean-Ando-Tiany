const router = require("express").Router();
const appointmentController = require("../controllers/appointment.controller");
const { sendResponse } = require("../utils/middlewares");

// get
router.get(
  "/",
  appointmentController.getAppointments,
  sendResponse("appointments")
);

router.get(
  "/:id",
  appointmentController.getAppointmentsByUserId,
  sendResponse("appointments")
);

router.get("/users/:userId", appointmentController.getByUserId);

router.get(
  "/total-monthly-appointments",
  appointmentController.totalMonthlyAppointments
);

// post
router.post("/", appointmentController.create);

// put
router.put("/confirm/:id", appointmentController.confirmedAppointment);

module.exports = router;
