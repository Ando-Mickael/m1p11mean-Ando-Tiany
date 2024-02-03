const router = require("express").Router();
const employeeController = require("../controllers/employee.controller");

router.get("/", employeeController.findAll);
router.get("/:id", employeeController.findOne);
router.post("/", employeeController.create);
router.put("/:id", employeeController.update);
router.delete("/:id", employeeController.deleteOne);

module.exports = router;
