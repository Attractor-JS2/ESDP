const mongoose = require('mongoose');

const { Schema } = mongoose;

const AttendanceSchema = new Schema({
  healingPlan: {
    type: Schema.Types.ObjectId,
    ref: 'HealingPlan',
    required: true,
  },
  medic: {
    type: Schema.Types.ObjectId,
    ref: 'HealingPlan',
    required: true,
  },
  attendanceDate: {
    type: Date,
    default: Date.now,
  },
  // procedures:[{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Procedure',
  // }]
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
