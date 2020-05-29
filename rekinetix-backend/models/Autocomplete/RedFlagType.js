const mongoose = require('mongoose');

const { Schema } = mongoose;

const RedFlagTypeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: Number,
    min: 1,
  }
});

const RedFlagType = mongoose.model('RedFlagType', RedFlagTypeSchema);

module.exports = RedFlagType;
