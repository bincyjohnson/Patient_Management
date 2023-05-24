const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      trim: true,
    },
    message: String,
    status: {
      type: String,
      enum: ['read', 'unread'],
      default: 'unread',
    },
  },
  {
    timestamps: true,
    collection: 'contactUs',
  }
);

module.exports = mongoose.model('contactUs', contactSchema);
