const mongoose = require('mongoose');
const Patient = require('./Patient');
const User = require('./User');

const { Schema } = mongoose;

const PrimaryAssessmentSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
  },
  attendingDoctor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const PrimaryAssessment = mongoose.model('PrimaryAssessment', PrimaryAssessmentSchema);

module.exports = PrimaryAssessment;
