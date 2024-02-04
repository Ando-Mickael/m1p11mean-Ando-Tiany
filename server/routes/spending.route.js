const router = require("express").Router();
const spendingController = require("../controllers/spending.controller");
const {sendResponse} = require("../utils/middlewares");

router.get("/", spendingController.getSpendings);
router.post("/", spendingController.create);

router.get("/:year", spendingController.getMonthlySpendings, sendResponse("result"));
router.get("/:year/:month", spendingController.getDailySpendings, sendResponse("result"));


module.exports = router;
