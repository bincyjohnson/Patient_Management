const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    salt: String,
  },
  {
    timestamps: true,
    collection: 'login',
  }
);

loginSchema.statics.validatePassword = (pass) => {
  return /^(?=.*\d).{8,}$/.test(pass);
};

loginSchema.statics.generateSalt = async () => {
  return await bcrypt.genSalt();
};

loginSchema.statics.hashPassword = async (pass, salt) => {
  return await bcrypt.hash(pass, salt);
};

loginSchema.statics.verifyPassword = async (pass, hash, salt) => {
  const hashPassword = await bcrypt.hash(pass, salt);
  if (hashPassword == hash) return true;
  else return false;
};

loginSchema.statics.genarateAuthTocken = (data) => {
  let expiresIn = expireIn(10);

  if (data.rememberMe) {
    expiresIn = expireIn(720);
  }

  return jwt.sign(
    {
      id: data._id,
      email: data.email,
      validity: data.password.concat(data._id).concat(data.email),
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn }
  );
};

const expireIn = (numDays) => {
  const dateObj = new Date();
  return dateObj.setMinutes(dateObj.getMinutes() + numDays);
};

module.exports = model('login', loginSchema);
