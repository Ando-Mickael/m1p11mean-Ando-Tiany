const router = require("express").Router();
const spendingController = require("../controllers/spending.controller");
const appointmentController = require("../controllers/appointment.controller");
const {sendResponse} = require("../utils/middlewares");
const {getMonthlyCommissions, combineExpensesAndCommissions} = require("../controllers/spending.controller");

router.get("/expenses/:year", spendingController.getMonthlySpendings, getMonthlyCommissions, combineExpensesAndCommissions, sendResponse("totalExpenses"));
router.get("/expenses/:year/:month", spendingController.getDailySpendings, sendResponse("expenses"));

router.get("/income/:year", appointmentController.getMonthlyIncome, sendResponse("income"));
router.get("/income/:year/:month", appointmentController.getDailyIncome, sendResponse("income"));

router.get("/revenue/:year", spendingController.getMonthlySpendings, appointmentController.getMonthlyIncome, appointmentController.calculateMonthlyRevenue, sendResponse("revenue"));
router.get("/revenue/:year/:month", spendingController.getDailySpendings, appointmentController.getDailyIncome, appointmentController.calculateDailyRevenue, sendResponse("revenue"));

router.get("/commissions/:year", spendingController.getMonthlyCommissions, sendResponse("commissions"));
router.get("/commissions/:year/:month", spendingController.getDailyCommissions, sendResponse("commissions"));


module.exports = router;
