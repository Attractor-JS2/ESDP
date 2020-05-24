const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProcedureDynamicSchema = new Schema({
  procedure: {
    type: Schema.Types.ObjectId,
    ref: 'Procedure',
    required: true,
  },
  procedureDynamic: {
    type: Number,
    min: 0,
    max: 2,
    default: 1,
  },
});

const painSchema = new Schema({
  comments: String,
  pain: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
});

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
  procedureDynamics: [ProcedureDynamicSchema],
  patientDynamic: {
    type: Number,
    min: 0,
    max: 2,
    default: 1,
  },
  beforeAttendance: painSchema,
  afterAttendance: painSchema,
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
