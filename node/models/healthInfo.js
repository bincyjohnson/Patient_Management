const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  remark: {
    type: String,
  },
});

const medicaldetails = new mongoose.Schema(
  {
    blood: {
      type: String,
      required: true,
      trim: true,
    },
    height: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: String,
      required: false,
      trim: true,
    },
    gender: {
      type: String,
      required: false,
      trim: true,
    },
    diseases: {
      type: [diseaseSchema],
      default: [],
    },
    loginId: {
      type: ObjectId,
      ref: 'login',
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'healthInfo',
  }
);

module.exports = mongoose.model('healthInfo', medicaldetails);
