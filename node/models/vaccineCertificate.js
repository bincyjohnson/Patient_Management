const mongoose = require('mongoose');

const vaccineCertificate = new mongoose.Schema(
  {
    certificateNumber: {
      type: String,
      trim: true,
      required: true,
    },
    patientName: { type: String, trim: true, required: true },
    patientUUID: { type: String, trim: true, required: true },
    patientRegId: { type: String, trim: true, required: true },
    vaccineName: { type: String, trim: true, required: true },
    vaccineTakenDatetime: { type: String, trim: true, required: true },
    disease: { type: String, trim: true, required: true },
    antigen: { type: String, trim: true, required: true },
    issuerName: { type: String, trim: true, required: true },
    issuerId: { type: String, trim: true, required: true },
    issuedDateTime: { type: Date, trim: true, required: true },
    transactionHash: String,
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    collection: 'vaccineCertificate',
  }
);

module.exports = mongoose.model('vaccineCertificate', vaccineCertificate);
