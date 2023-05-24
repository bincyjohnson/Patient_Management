const Joi = require('joi');
const { errorMessage } = require('../../helper/cred');

exports.registerPatient = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required',
      }),
    phoneNumber: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required()
      .messages({
        'string.pattern.base': `Phone number must have 10 digits.`,
        'string.empty': 'Phone Number is required',
      }),
    aadhar: Joi.string()
      .regex(
        /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/
      )
      .required()
      .messages({
        'string.pattern.base': `Please provide a valid Aadhar Number`,
        'string.empty': 'AadharNumber is required',
      }),
    password: Joi.string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      )
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': `Password must include at least one uppercase letter, one lowercase letter, one number, and one special character`,
        'string.empty': 'AadharNumber is required',
      }),
    address: Joi.string().required(),
    dob: Joi.date(),
  });
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    console.log(err);
    return errorMessage(res, err.message);
  }
};
