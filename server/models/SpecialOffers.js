const mongoose = require('mongoose');

const specialOfferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: false
  },
  startDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

const SpecialOffer = mongoose.model('SpecialOffer', specialOfferSchema);

module.exports = SpecialOffer;
