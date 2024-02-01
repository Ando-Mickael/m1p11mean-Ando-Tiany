const mongoose = require("mongoose");

const workScheduleSchema = new mongoose.Schema({
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
});

const taskSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    commissionEarned: { type: Number, required: true }
});

const employeeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workSchedule: [workScheduleSchema],
    tasks: [taskSchema]
});

module.exports = mongoose.model("Employee", employeeSchema);