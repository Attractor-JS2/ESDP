const mongoose = require('mongoose');
const Patient = require('./Patient');
const User = require('./User');

const { Schema } = mongoose;

const PrimaryAssessmentSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  attendingDoctor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
  complaints: {
    type: String,
    required: true,
  },
  anamnesisVitae: {
    type: String,
    required: true,
  },
  anamnesisMorbi: {
    type: String,
    required: true,
  },
  examinations: {
    type: String,
  },
  diagnosis: {
    type: String,
    required: true,
  }
});

const PrimaryAssessment = mongoose.model('PrimaryAssessment', PrimaryAssessmentSchema);

module.exports = PrimaryAssessment;
