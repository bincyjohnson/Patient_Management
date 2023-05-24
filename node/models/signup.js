const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const signup = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    aadhar: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: false,
      trim: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'Patient'],
      default: 'Patient',
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
    collection: 'signup',
  }
);

module.exports = mongoose.model('signup', signup);
