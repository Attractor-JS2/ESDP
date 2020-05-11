const mongoose = require('mongoose');

const { Schema } = mongoose;

const RedFlagSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cancelledBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const RedFlag = mongoose.model('RedFlag', RedFlagSchema);

module.exports = RedFlag;
