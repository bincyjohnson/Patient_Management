const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const consultation = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    hospitalId: {
      type: ObjectId,
      ref: 'hospital',
      required: true,
      trim: true,
    },
    departmentId: {
      type: ObjectId,
      ref: 'department',
      required: false,
      trim: true,
    },
    doctorId: {
      type: ObjectId,
      ref: 'doctor',
      required: false,
    },
    time: {
      type: String,
      required: false,
      trim: true,
    },
    loginId: {
      type: ObjectId,
      ref: 'login',
      required: false,
    },
    date: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'complted'],
      default: 'pending',
    },
    transactionId: {
      type: ObjectId,
      ref: 'transaction',
      required: false,
    },
    certificateStatus: {
      type: String,
      enum: ['pending', 'completed', 'issued'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    collection: 'consultation',
  }
);

module.exports = mongoose.model('consultation', consultation);
