const mongoose = require('mongoose');

const { Schema } = mongoose;

const StageTypeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  stageNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const StageType = mongoose.model('StageType', StageTypeSchema);

module.exports = StageType;
