import Joi from 'joi';

export const vaccineVariable = {
  vaccineId: '',
  hospitalId: '',
  date: '',
  time: '',
};

export const vaccineValidation = Joi.object({
  hospitalId: Joi.string().required().label('Hospital').messages({
    'string.empty': 'Required',
  }),
  vaccineId: Joi.string().required().label('Vaccine').messages({
    'string.empty': 'Required',
  }),
  date: Joi.date().required().label('Date').messages({
    'date.min': 'Date must be after today',
    'any.required': 'Required',
  }),
  time: Joi.string().required().label('Time').messages({
    'string.empty': 'Required',
  }),
});
