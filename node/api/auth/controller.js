const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../../models/login');
const Signup = require('../../models/signup');
const Contact = require('../../models/contactUs');

const {
  findOneData,
  postData,
  successMessage,
  errorMessage,
  successData,
} = require('../../helper/cred');

module.exports = {
  createUser: async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const salt = await User.generateSalt();
      let hashPass = await User.hashPassword(req.body.password, salt);

      let loginData = new User({
        email: req.body.email,
        password: hashPass,
        salt,
      });
      await loginData.save({ session });

      req.body.loginId = loginData._id;
      let signupData = new Signup(req.body);
      await signupData.save({ session });

      await session.commitTransaction();
      session.endSession();

      return successMessage(
        res,
        'Registered successfully. You can check your email'
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      // Duplicate key error
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email)
        return errorMessage(res, 'User with this email already exists');
      else if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.aadhar
      )
        return errorMessage(res, 'Aadhar number already exists');

      return errorMessage(res, error.message);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // no user
      const user = await User.findOne({ email });
      if (!user) return errorMessage(res, 'Invalid Email or Password');

      // invalid password
      if (!(await User.verifyPassword(password, user.password, user.salt)))
        return errorMessage(res, 'Invalid Email or Password');

      const accessTocken = User.genarateAuthTocken(user);
      const refreshTocken = User.genarateAuthTocken(user);

      // get role
      let { role } = await Signup.findOne({ loginId: user._id });
      return successData(res, { accessTocken, role });
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  contacUs: async (req, res, next) => {
    try {
      await Contact.create(req.body);
      return successMessage(res, 'Your message is sended successfully');
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },
};
