const Spending = require("../models/Spending");
const Appointment = require("../models/Appointment");

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

// Middleware to get monthly spendings for a selected year
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

    req.expenses = result;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Middleware to get daily spendings for a selected month and year
async function getDailySpendings(req, res, next) {
  const { year, month } = req.params;

  try {
    // Generate an array of all days in the month
    const daysInMonth = Array.from({ length: new Date(year, month, 0).getDate() }, (_, index) => index + 1);

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
          totalCommission: { $literal: 0 }, // Initialize totalCommission to 0
        },
      },
    ]);

    // Merge result with all days in the month
    const mergedResult = daysInMonth.map((day) => {
      const foundDay = result.find((item) => item.day === day);
      if (foundDay) {
        return foundDay;
      } else {
        return { day, totalAmount: 0, totalCommission: 0 };
      }
    });

    // For each day, find the total commission
    for (const dayData of mergedResult) {
      if (dayData.totalAmount === 0) {
        const commissions = await Appointment.aggregate([
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: [{ $year: '$date' }, parseInt(year)] },
                  { $eq: [{ $month: '$date' }, parseInt(month)] },
                  { $eq: [{ $dayOfMonth: '$date' }, dayData.day] },
                ],
              },
              status: 'confirmed',
            },
          },
          {
            $unwind: '$serviceIds',
          },
          {
            $lookup: {
              from: 'services',
              localField: 'serviceIds',
              foreignField: '_id',
              as: 'service',
            },
          },
          {
            $unwind: '$service',
          },
          {
            $addFields: {
              commissionAmount: {
                $multiply: ['$service.price', { $divide: ['$service.commissionRate', 100] }],
              },
            },
          },
          {
            $group: {
              _id: null,
              totalCommission: { $sum: '$commissionAmount' },
            },
          },
          {
            $project: {
              _id: 0,
              totalCommission: 1,
            },
          },
        ]);

        if (commissions.length > 0) {
          dayData.totalCommission = commissions[0].totalCommission;
        }
      }
    }

    req.expenses = mergedResult;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Middleware to get monthly commissions for a selected year
async function getMonthlyCommissions(req, res, next) {
  const { year } = req.params;

  try {
    const result = await Appointment.aggregate([
      {
        $match: {
          date: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${parseInt(year) + 1}-01-01`) },
          status: 'confirmed',
        },
      },
      {
        $lookup: {
          from: 'services',
          localField: 'serviceIds',
          foreignField: '_id',
          as: 'services',
        },
      },
      {
        $unwind: '$services',
      },
      {
        $lookup: {
          from: 'specialoffers',
          let: { serviceId: '$services._id', appointmentDate: '$date' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $lte: ['$startDate', '$$appointmentDate'] },
                    { $gte: ['$endDate', '$$appointmentDate'] },
                  ],
                },
              },
            },
            {
              $project: {
                percentages: { $objectToArray: '$percentages' },
              },
            },
          ],
          as: 'specialOffer',
        },
      },
      {
        $unwind: { path: '$specialOffer', preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          discountPercentage: {
            $cond: [
              { $ifNull: ['$specialOffer.percentages', false] },
              { $arrayElemAt: ['$specialOffer.percentages.v', 1] },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          discountedPrice: {
            $cond: [
              { $eq: ['$discountPercentage', 0] },
              '$services.price',
              {
                $subtract: [
                  '$services.price',
                  { $multiply: ['$services.price', { $divide: ['$discountPercentage', 100] }] },
                ],
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: { $month: '$date' },
          totalCommission: { $sum: { $multiply: ['$discountedPrice', { $divide: ['$services.commissionRate', 100] }] } },
          totalPrice: { $sum: '$discountedPrice' },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          totalCommission: 1,
          totalPrice: 1,
        },
      },
      {
        $sort: { month: 1 }
      }
    ]);

    req.commissions = result;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Middleware to get daily commissions for a selected month and year
async function getDailyCommissions(req, res, next) {
  const { year, month } = req.params;

  try {
    const result = await Appointment.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: '$date' }, parseInt(year)] },
              { $eq: [{ $month: '$date' }, parseInt(month)] },
            ],
          },
          status: 'confirmed', // Only consider confirmed appointments
        },
      },
      {
        $unwind: '$serviceIds',
      },
      {
        $lookup: {
          from: 'services',
          localField: 'serviceIds',
          foreignField: '_id',
          as: 'service',
        },
      },
      {
        $unwind: '$service',
      },
      {
        $group: {
          _id: { $dayOfMonth: '$date' }, // Group by day of month
          totalCommission: {
            $sum: {
              $multiply: [
                '$service.price',
                { $divide: ['$service.commissionRate', 100] },
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          day: '$_id',
          totalCommission: 1,
        },
      },
    ]);

    req.commissions = result;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function combineExpensesAndCommissions(req, res, next) {
  try {
    // Extract expenses and commissions from request object
    const { expenses, commissions } = req;

    // Create a map to store total amounts for each month
    const totalMap = new Map();

    // Sum up totalAmount from expenses
    expenses.forEach(expense => {
      const { totalAmount, month } = expense;
      if (totalMap.has(month)) {
        totalMap.set(month, totalMap.get(month) + totalAmount);
      } else {
        totalMap.set(month, totalAmount);
      }
    });

    // Sum up totalCommission from commissions
    commissions.forEach(commission => {
      const { totalCommission, month } = commission;
      if (totalMap.has(month)) {
        totalMap.set(month, totalMap.get(month) + totalCommission);
      } else {
        totalMap.set(month, totalCommission);
      }
    });

    // Construct the combined array
    const totalExpenses = [];
    totalMap.forEach((totalAmount, month) => {
      totalExpenses.push({ totalAmount, month });
    });

    // Sort the combined array by month
    totalExpenses.sort((a, b) => a.month - b.month);

    // Set req.totalExpenses
    req.totalExpenses = totalExpenses;

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
  getMonthlyCommissions,
  getDailyCommissions,
  combineExpensesAndCommissions
};
