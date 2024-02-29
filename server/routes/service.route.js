const router = require("express").Router();
const serviceController = require("../controllers/service.controller");
const { sendResponse } = require("../utils/middlewares");

router.get("/", serviceController.getServices, sendResponse("services"));
router.post("/cart", serviceController.cart);
router.post("/", serviceController.createService, sendResponse("service"));
router.put("/:id", serviceController.updateService, sendResponse("service"));
router.delete("/:id", serviceController.deleteService, sendResponse("service"));

module.exports = router;
