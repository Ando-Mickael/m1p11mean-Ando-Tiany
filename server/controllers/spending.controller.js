const Spending = require("../models/Spending");

async function getSpendings(req, res) {
  try {
    const spendings = await Spending.find();
    res.json(spendings);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function create(req, res) {
  const { name, amount, date } = req.body;

  try {
    const newSpending = new Spending({
      name,
      amount,
      date: new Date(date),
    });

    const savedSpending = await newSpending.save();
    res.json(savedSpending);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getSpendings,
  create,
};
