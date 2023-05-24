import * as Yup from 'yup';

export const signupVariable = {
  name: '',
  phoneNumber: '',
  email: '',
  aadhar: '',
  password: '',
  address: '',
};

export const signupValidation = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number format')
    .required('Required'),
  aadhar: Yup.string()
    .matches(
      /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/,
      'Invalid Aadhar number'
    )
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Required'),
  address: Yup.string().required('Required'),
});
