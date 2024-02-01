const router = require("express").Router();
const employeeController = require("../controllers/employee.controller");
const userController = require("../controllers/user.controller");
const {sendResponse} = require("../utils/middlewares");

router.get("/:id", userController.getUserById, employeeController.getEmployeeById, sendResponse("employee"));


module.exports = router;
