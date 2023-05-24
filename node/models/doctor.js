const mongoose = require('mongoose');

const doctor = new mongoose.Schema(
  {
    doctorName: {
      type: String,
      trim: true,
      required: true,
    },
    departmentId: {
      type: String,
      trim: true,
      required: true,
    },
    hospitalId: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'doctor',
  }
);

module.exports = mongoose.model('doctor', doctor);
