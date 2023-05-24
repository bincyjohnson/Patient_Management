const mongoose = require('mongoose');

const department = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      trim: true,
      required: true,
    },
    departmentId: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'department',
  }
);

module.exports = mongoose.model('department', department);
