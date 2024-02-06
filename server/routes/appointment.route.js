const router = require("express").Router();
const appointmentController = require("../controllers/appointment.controller");
const { sendResponse } = require("../utils/middlewares");

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
router.post("/", appointmentController.create);

router.get("/users/:userId", appointmentController.getByUserId);

module.exports = router;
