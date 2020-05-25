const mongoose = require('mongoose');

const { Schema } = mongoose;

const RedFlagTypeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const RedFlagType = mongoose.model('RedFlagType', RedFlagTypeSchema);

module.exports = RedFlagType;
