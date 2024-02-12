const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { sendResponse } = require("../utils/middlewares");

router.get("/:id", userController.getUserById, sendResponse("user"));
router.put("/:id", userController.updateUser, sendResponse("user"));
router.get("/notifications/:userId", userController.todayNotifications);

module.exports = router;
