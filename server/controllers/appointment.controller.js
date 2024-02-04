const Appointment = require('../models/Appointment');
const User = require('../models/User');

const getAppointments = async (req, res, next) => {
    try {
        req['appointments'] = await Appointment.find();
        next();
    } catch (error) {
        console.error('Error getting appointments', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAppointmentsByUserId = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let appointments;

        if (user.role === 'client') {
            // If the user is a client, get appointments where userId = id
            appointments = await Appointment.find({ userId });
        } else if (user.role === 'employee') {
            // If the user is an employee, get appointments where employeeId = id
            appointments = await Appointment.find({ employeeId: userId });
        } else {
            return res.status(400).json({ error: 'Invalid user role' });
        }

        req['appointments'] = appointments;
        next();
    } catch (error) {
        console.error('Error getting appointments by user ID', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAppointments,
    getAppointmentsByUserId,
};
