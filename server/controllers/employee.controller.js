const Employee = require("../models/Employee");

async function getEmployeeById(req, res, next) {
    const userId = req["user"]._id;

    try {
        const employee = await Employee.findOne({ userId });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        req["employee"] = {
            userInfo: req["user"],
            ...employee.toObject()
        };
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateWorkSchedule(req, res, next) {
    const userId = req.params.id;
    const { workSchedule } = req.body;

    try {
        const employee = await Employee.findOne({ userId });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        employee.workSchedule = workSchedule || employee.workSchedule;

        req["employee"] = await employee.save();
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getEmployeeById,
    updateWorkSchedule
};
