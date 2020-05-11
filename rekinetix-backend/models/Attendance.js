const mongoose = require('mongoose');

const { Schema } = mongoose;

const AttendanceSchema = new Schema({
  healingPlan: {
    type: Schema.Types.ObjectId,
    ref: 'HealingPlan',
    required: true,
  },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
