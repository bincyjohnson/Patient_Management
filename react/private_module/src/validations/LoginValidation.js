import * as Yup from 'yup';

export const loginVariable = {
  password: '',
  email: '',
};

export const loginValidation = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});
