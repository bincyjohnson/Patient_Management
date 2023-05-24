const mongoose = require('mongoose');

const vaccine = new mongoose.Schema(
  {
    name: String,
    disease: String,
    antigen: String,
  },
  {
    timestamps: true,
    collection: 'vaccine',
  }
);

module.exports = mongoose.model('vaccine', vaccine);
