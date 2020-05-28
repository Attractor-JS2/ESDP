const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['мужской', 'женский'],
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
