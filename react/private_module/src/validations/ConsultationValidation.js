import Joi from 'joi';

export const consultVariable = {
  hospitalId: '',
  departmentId: '',
  doctorId: '',
  date: '',
  time: '',
};

export const consultValidation = Joi.object({
  hospitalId: Joi.string().required().label('Hospital').messages({
    'string.empty': 'Required',
  }),
  departmentId: Joi.string().required().label('Department').messages({
    'string.empty': 'Required',
  }),
  doctorId: Joi.string().required().label('Doctor').messages({
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
