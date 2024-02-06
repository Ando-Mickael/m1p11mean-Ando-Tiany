const router = require("express").Router();
const spendingController = require("../controllers/spending.controller");
const {sendResponse} = require("../utils/middlewares");

router.get("/", spendingController.getSpendings);
router.post("/", spendingController.create);

module.exports = router;
