const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const transaction = new mongoose.Schema(
  {
    amount: {
      type: String,
      default: '500 Rs',
      required: true,
    },
    appointmentType: {
      type: String,
      enum: ['consultation', 'vaccination'],
      required: false,
    },
    transactionHash: String,

    loginId: {
      type: ObjectId,
      ref: 'login',
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'transaction',
  }
);

module.exports = mongoose.model('transaction', transaction);
