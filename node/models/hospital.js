const mongoose = require('mongoose');

const hospital = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      trim: true,
      required: true,
    },
    place: {
      type: String,
      trim: true,
      required: true,
    },
    hospitalId: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'hospital',
  }
);

module.exports = mongoose.model('hospital', hospital);
