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

// Get the sum of all amounts for each month in the selected year
async function getMonthlySpendings(req, res, next) {
  const { year } = req.params;

  try {
    const result = await Spending.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $year: '$date' }, parseInt(year)] },
        },
      },
      {
        $group: {
          _id: { $month: '$date' },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          totalAmount: 1,
        },
      },
    ]);

    req.result = result;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get the sum of all amounts for each day in the selected month and year
async function getDailySpendings(req, res, next) {
  const { year, month } = req.params;

  try {
    const result = await Spending.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: '$date' }, parseInt(year)] },
              { $eq: [{ $month: '$date' }, parseInt(month)] },
            ],
          },
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: '$date' },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          day: '$_id',
          totalAmount: 1,
        },
      },
    ]);

    req.result = result;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  getSpendings,
  create,
  getMonthlySpendings,
  getDailySpendings,
};
