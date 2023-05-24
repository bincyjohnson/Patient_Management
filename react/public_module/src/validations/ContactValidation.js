import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.empty': 'Phone Number is required',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
    }),
  message: Joi.string().required().messages({
    'string.empty': 'Message is required',
  }),
});

export const variables = {
  name: '',
  phoneNumber: '',
  email: '',
  message: '',
};
