const router = require("express").Router();
const spendingController = require("../controllers/spending.controller");

router.get("/", spendingController.getSpendings);
router.post("/", spendingController.create);

module.exports = router;
