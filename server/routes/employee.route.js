const router = require("express").Router();
const employeeController = require("../controllers/employee.controller");
const userController = require("../controllers/user.controller");
const { sendResponse } = require("../utils/middlewares");

router.get("/", employeeController.findAll);
// router.get("/:id", employeeController.findOne);
router.post("/", employeeController.create);
router.put("/:id", employeeController.update);
router.delete("/:id", employeeController.deleteOne);

router.get(
  "/:id",
  userController.getUserById,
  employeeController.getEmployeeById,
  sendResponse("employee")
);
router.post(
  "/:id",
  userController.updateUser,
  employeeController.updateWorkSchedule,
  sendResponse("employee")
);

module.exports = router;
