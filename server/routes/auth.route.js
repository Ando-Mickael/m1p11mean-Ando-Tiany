const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/send-code", authController.sendCode);

module.exports = router;
