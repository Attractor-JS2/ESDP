const mongoose = require('mongoose');

const { Schema } = mongoose;

const HealingPlanSchema = new Schema({
  primaryAssessment: {
    type: Schema.Types.ObjectId,
    ref: 'PrimaryAssessment',
    required: true,
  },
  medic: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  statusActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

const HealingPlan = mongoose.model('HealingPlan', HealingPlanSchema);

module.exports = HealingPlan;
