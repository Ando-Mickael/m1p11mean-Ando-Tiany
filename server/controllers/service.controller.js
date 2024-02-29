const Service = require("../models/Service");

const getServices = async (req, res, next) => {
  try {
    req["services"] = await Service.find();
    next();
  } catch (error) {
    next(error);
  }
};

const createService = async (req, res, next) => {
  try {
    const { name, price, duration, commissionRate } = req.body;
    const newService = new Service({ name, price, duration, commissionRate });
    req.service = await newService.save();
    next();
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, duration, commissionRate } = req.body;
    req.service = await Service.findByIdAndUpdate(
      id,
      { name, price, duration, commissionRate },
      { new: true }
    );
    next();
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.service = await Service.findByIdAndDelete(id);
    next();
  } catch (error) {
    next(error);
  }
};

async function cart(req, res) {
  const { serviceIds } = req.body;

  try {
    let services = [];

    for (let index = 0; index < serviceIds.length; index++) {
      const service = await Service.findById(serviceIds[index]);
      services.push(service);
    }

    res.json({ services });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService,
  cart,
};
