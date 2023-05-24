const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Hospital = require('../../models/hospital');
const Doctor = require('../../models/doctor');
const Department = require('../../models/department');
const Consultation = require('../../models/consultation');
const Vaccine = require('../../models/vaccine');
const Vaccination = require('../../models/vaccination');
const Transaction = require('../../models/transaction');
const Signup = require('../../models/signup');

const {
  findOneData,
  postData,
  successMessage,
  errorMessage,
  successData,
} = require('../../helper/cred');

const TimeDropdown = () => {
  // Generate an array of time options
  const timeOptions = [];

  for (let hour = 9; hour <= 11; hour++) {
    timeOptions.push(`${hour}:00 AM`);
  }

  for (let hour = 1; hour <= 5; hour++) {
    timeOptions.push(`${hour}:00 PM`);
  }

  return timeOptions;
};

module.exports = {
  getAllHospital: async (req, res, next) => {
    try {
      let hospitals = await Hospital.find();
      return successData(res, hospitals);
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  getAllDepartment: async (req, res, next) => {
    try {
      let departments = await Department.find();
      return successData(res, departments);
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  getDoctor: async (req, res, next) => {
    try {
      let { departmentId, hospitalId } = req.body;
      let doctors = await Doctor.find({ departmentId, hospitalId });
      if (doctors.length < 1) return errorMessage(res, 'No Doctors Available');
      return successData(res, doctors);
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  getVaccine: async (req, res, next) => {
    try {
      let vaccine = await Vaccine.find();
      return successData(res, vaccine);
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  getAvailTime: async (req, res, next) => {
    try {
      let { date, doctorId } = req.body;
      let bookData = await Consultation.find({
        date: new Date(date).setHours(0, 0, 0, 0),
        doctorId,
      });
      if (bookData.length < 1) successData(res, TimeDropdown());
      else {
        let bookedTime = bookData.map((e) => e.time);
        let allTime = TimeDropdown();
        let filteredTime = allTime.filter(
          (e) => !bookedTime.find((f) => e === f)
        );
        successData(res, filteredTime);
      }
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  bookConsultation: async (req, res, next) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
      let { bookingData, transactionData } = req.body;

      let hospitalData = await Hospital.findOne({
        hospitalId: bookingData.hospitalId,
      });

      let departmentData = await Department.findOne({
        departmentId: bookingData.departmentId,
      });

      // insert data to transaction model
      let paymentData = new Transaction({
        appointmentType: 'consultation',
        transactionHash: transactionData.transactionHash,
        loginId: req.user.id,
      });
      // let { _id } = await paymentData.save({ session });
      let { _id } = await paymentData.save();

      // insert data to consultation model
      bookingData.hospitalId = hospitalData.id;
      bookingData.departmentId = departmentData.id;
      bookingData.loginId = req.user.id;
      bookingData.date = new Date(bookingData.date).setHours(0, 0, 0, 0);
      bookingData.transactionId = _id;

      let consultationData = new Consultation(bookingData);
      // await consultationData.save({ session });
      await consultationData.save();

      // await session.commitTransaction();
      // session.endSession();

      return successMessage(
        res,
        'Your Payment is Success and booking is Confirmed'
      );
    } catch (error) {
      // await session.abortTransaction();
      // session.endSession();
      return errorMessage(res, error.message);
    }
  },

  bookVaccine: async (req, res, next) => {
    try {
      let { bookingData, transactionData } = req.body;
      bookingData.loginId = req.user.id;

      // insert data to transaction modal
      let paymentData = new Transaction({
        appointmentType: 'vaccination',
        transactionHash: transactionData.transactionHash,
        loginId: req.user.id,
      });
      let { _id } = await paymentData.save();

      bookingData.transactionId = _id;
      let vaccinationData = new Vaccination(bookingData);
      await vaccinationData.save();

      return successData(res, 'Payment success and your booking is confirmed');
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  getAllConsultation: async (req, res, next) => {
    try {
      const result = await Consultation.aggregate([
        {
          $match: { loginId: new mongoose.Types.ObjectId(req.user.id) },
        },
        {
          $lookup: {
            from: 'hospital',
            localField: 'hospitalId',
            foreignField: '_id',
            as: 'hospital',
          },
        },
        {
          $unwind: { path: '$hospital', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'department',
            localField: 'departmentId',
            foreignField: '_id',
            as: 'department',
          },
        },
        {
          $unwind: { path: '$department', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'doctor',
            localField: 'doctorId',
            foreignField: '_id',
            as: 'doctor',
          },
        },
        {
          $unwind: { path: '$doctor', preserveNullAndEmptyArrays: true },
        },
      ]);

      return successData(res, result);
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  getAllVaccination: async (req, res, next) => {
    try {
      const result = await Vaccination.find({ loginId: req.user.id })
        .populate('vaccineId')
        .populate('hospitalId');
      return successData(res, result);
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  listAllConsultation: async (req, res, next) => {
    try {
      let result = await Consultation.find()
        .populate('hospitalId')
        .populate('doctorId')
        .populate('departmentId')
        .populate('loginId');

      return successData(res, result);
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  listAllVaccination: async (req, res, next) => {
    try {
      let result = await Vaccination.find()
        .populate('hospitalId')
        .populate('vaccineId')
        .populate('loginId');

      return successData(res, result);
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  viewConsultation: async (req, res, next) => {
    try {
      let consult = await Consultation.findOne({ _id: req.params.id })
        .populate('hospitalId')
        .populate('doctorId')
        .populate('departmentId')
        .populate('loginId');

      let user = await Signup.findOne({ loginId: consult?.loginId?._id });
      return successData(res, { consult, user });
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  viewVaccination: async (req, res, next) => {
    try {
      let consult = await Vaccination.findOne({ _id: req.params.id })
        .populate('hospitalId')
        .populate('vaccineId')
        .populate('loginId');

      let user = await Signup.findOne({ loginId: consult?.loginId?._id });
      return successData(res, { consult, user });
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },
};
