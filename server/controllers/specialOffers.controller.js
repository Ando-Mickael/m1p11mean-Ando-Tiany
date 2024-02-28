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
    const { name, description, percentages, startDate, endDate } = req.body;

    try {
        // Convert the percentages array to a Map
        const percentagesMap = new Map();
        percentages.forEach(item => {
            percentagesMap.set(item.serviceId, item.percentage);
        });

        const newSpecialOffer = new SpecialOffer({
            name,
            description,
            percentages: percentagesMap, // Assign the Map to percentages field
            startDate,
            endDate,
        });

        // Save the special offer to the database
        const savedSpecialOffer = await newSpecialOffer.save();

        req["offer"] = savedSpecialOffer;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};
