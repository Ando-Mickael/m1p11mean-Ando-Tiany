const router = require("express").Router();
const userController = require("../controllers/user.controller");
const {sendResponse} = require("../utils/middlewares");

router.get("/:id", userController.getUserById, sendResponse("user"));

module.exports = router;