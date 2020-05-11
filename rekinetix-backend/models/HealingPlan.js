const mongoose = require('mongoose');

const { Schema } = mongoose;

const HealingPlanSchema = new Schema({
  primaryAssessment: {
    type: Schema.Types.ObjectId,
    ref: 'PrimaryAssessment',
    required: true,
  },
}, { timestamps: true });

const HealingPlan = mongoose.model('HealingPlan', HealingPlanSchema);

module.exports = HealingPlan;
