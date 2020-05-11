const mongoose = require('mongoose');

const { Schema } = mongoose;

const AreaDescriptionSchema = new Schema({
  D: String,
  S: String,
  additionalInfo: String,
});

const ObjectiveExamSchema = new Schema({
  foot: AreaDescriptionSchema,
  hip: AreaDescriptionSchema,
  pelvicSpine: AreaDescriptionSchema,
  lumbarSpine: AreaDescriptionSchema,
  thoracicSpine: AreaDescriptionSchema,
  shoulderGirdel: AreaDescriptionSchema,
  headAndNeck: AreaDescriptionSchema,
});

const ObjectiveExam = mongoose.model('ObjectiveExam', ObjectiveExamSchema);

module.exports = ObjectiveExam;
