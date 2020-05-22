const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProcedureSchema = new Schema({
  stage: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  procedureArea: {
    type: String,
    required: true,
  },
  procedureName: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: 'запланировано',
    enum: [
      'запланировано',
      'действует',
      'приостановлено',
      'прервано',
      'завершено',
    ],
  },
  procedureQuantity: {
    type: Number,
    min: 0,
  },
  patientName: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  medicName: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Procedure = mongoose.model('Procedure', ProcedureSchema);

module.exports = Procedure;
