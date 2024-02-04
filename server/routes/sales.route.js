const router = require("express").Router();
const spendingController = require("../controllers/spending.controller");
const appointmentController = require("../controllers/appointment.controller");
const {sendResponse} = require("../utils/middlewares");

router.get("/expenses/:year", spendingController.getMonthlySpendings, sendResponse("expenses"));
router.get("/expenses/:year/:month", spendingController.getDailySpendings, sendResponse("expenses"));

router.get("/income/:year", appointmentController.getMonthlyIncome, sendResponse("income"));
router.get("/income/:year/:month", appointmentController.getDailyIncome, sendResponse("income"));

router.get("/revenue/:year", spendingController.getMonthlySpendings, appointmentController.getMonthlyIncome, appointmentController.calculateMonthlyRevenue, sendResponse("revenue"));
router.get("/revenue/:year/:month", spendingController.getDailySpendings, appointmentController.getDailyIncome, appointmentController.calculateDailyRevenue, sendResponse("revenue"));

module.exports = router;
