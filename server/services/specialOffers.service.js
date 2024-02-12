const SpecialOffer = require("../models/SpecialOffers");

async function getTodayOffers() {
  const now = new Date();

  const offers = await SpecialOffer.find({
    startDate: {
      $lte: now,
    },
    endDate: {
      $gte: now,
    },
  });

  return offers;
}

module.exports = {
  getTodayOffers,
};
