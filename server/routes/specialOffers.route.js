const router = require("express").Router();
const specialOffersController = require("../controllers/specialOffers.controller");
const {sendResponse} = require("../utils/middlewares");

router.get("/", specialOffersController.getSpecialOffers, sendResponse("offers"));
router.post("/", specialOffersController.saveSpecialOffer, sendResponse("offer"));

module.exports = router;