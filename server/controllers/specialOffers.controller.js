const SpecialOffer = require('../models/SpecialOffers');

exports.getSpecialOffers = async (req, res, next) => {
    try {
        const specialOffers = await SpecialOffer.find();
        req["offers"] = specialOffers;
        next();
    } catch (error) {
        next(error);
    }
};

exports.saveSpecialOffer = async (req, res, next) => {
    const { name, description, discountPercentage, startDate, endDate } = req.body;

    try {
        const newSpecialOffer = new SpecialOffer({
            name,
            description,
            discountPercentage,
            startDate,
            endDate,
        });

        // Save the special offer to the database
        const savedSpecialOffer = await newSpecialOffer.save();

        req["offer"] = savedSpecialOffer;
        next();
    } catch (error) {
        next(error);
    }
};
