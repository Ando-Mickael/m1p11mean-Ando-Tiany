const router = require("express").Router();
const spendingController = require("../controllers/spending.controller");
const appointmentController = require("../controllers/appointment.controller");
const {sendResponse} = require("../utils/middlewares");

router.get("/expenses/:year", spendingController.getMonthlySpendings, sendResponse("result"));
router.get("/expenses/:year/:month", spendingController.getDailySpendings, sendResponse("result"));

router.get("/income/:year", appointmentController.getMonthlyIncome, sendResponse("result"));
router.get("/income/:year/:month", appointmentController.getDailyIncome, sendResponse("result"));


module.exports = router;
