import React, { useEffect, useState } from 'react';
import './style.css';
import { Formik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  signupValidation,
  signupVariable,
} from '../../validations/SignupValidation';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmins } from './actions';
import history from '../../history';

const SignupForm = () => {
  const [dob, setDob] = useState(new Date());
  const dispatch = useDispatch();

  const { islogin, role } = useSelector((state) => state.authReducer);

  useEffect(() => {
    // Check if the user is logged in and has a role
    if (islogin && role) {
      // Redirect to the dashboard based on the role
      if (role === 'Admin') {
        history.push('/dashboard');
      } else if (role === 'Patient') {
        history.push('/patientDashboard');
      }
    }
  }, [islogin, role, history]);

  return (
    <>
      <div className="cmt bg-shade">
        <h1 className="heading">Signup</h1>
        <Formik
          initialValues={signupVariable}
          validationSchema={signupValidation}
          onSubmit={(values, { setSubmitting }) => {
            values.dob = dob;
            dispatch(addAdmins(values));
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="container signup-section"
            >
              <div className="row sigup-row">
                {/* name */}
                <div className="col-12 col-md-6">
                  <div className="container-input flex-c">
                    <div className="formfield" id="input_field">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        {...formik.getFieldProps('name')}
                      />
                      <label for="name">Name</label>

                      <div className="ms-4">
                        {formik.touched.name && formik.errors.name ? (
                          <div className="error">{formik.errors.name}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                {/* phoneNumber */}
                <div className="col-12 col-md-6">
                  <div className="container-input flex-c">
                    <div className="formfield" id="input_field">
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        {...formik.getFieldProps('phoneNumber')}
                      />
                      <label for="phoneNumber">Phone Number</label>

                      <div className="ms-4">
                        {formik.touched.phoneNumber &&
                        formik.errors.phoneNumber ? (
                          <div className="error">
                            {formik.errors.phoneNumber}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row sigup-row">
                {/* Email */}
                <div className="col-12 col-md-6">
                  <div className="container-input flex-c">
                    <div className="formfield" id="input_field">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        {...formik.getFieldProps('email')}
                      />
                      <label htmlFor="email">Email</label>

                      <div className="ms-4">
                        {formik.touched.email && formik.errors.email ? (
                          <div className="error">{formik.errors.email}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aadhar */}
                <div className="col-12 col-md-6">
                  <div className="container-input flex-c">
                    <div className="formfield" id="input_field">
                      <input
                        type="text"
                        name="aadhar"
                        id="aadhar"
                        {...formik.getFieldProps('aadhar')}
                      />
                      <label htmlFor="aadhar">Aadhar Number</label>
                      <div className="ms-4">
                        {formik.touched.aadhar && formik.errors.aadhar ? (
                          <div className="error">{formik.errors.aadhar}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row sigup-row">
                {/* DOB */}
                <div className="col-12 col-md-6  flex ">
                  <div className="container-input flex m-auto">
                    <label htmlFor="dob" className="w-50 mx-3 ms-4 dob-label">
                      Date Of Birth
                    </label>
                    <DatePicker
                      selected={dob}
                      onChange={(date) => setDob(date)}
                      className="datefield w-1"
                      maxDate={new Date()}
                    />
                    <div className="ms-4">
                      {formik.touched.dob && formik.errors.dob ? (
                        <div className="error">{formik.errors.dob}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="container-input flex-c">
                    <div className="formfield" id="input_field">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        {...formik.getFieldProps('password')}
                      />
                      <label htmlFor="password">Password</label>
                      <div className="ms-4">
                        {formik.touched.password && formik.errors.password ? (
                          <div className="error">{formik.errors.password}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row sigup-row">
                <div className="col-12 col-md-6">
                  <div className="container-input flex-c">
                    <div className="formfield" id="input_field">
                      <textarea
                        className="datefield"
                        name="address"
                        id="address"
                        cols={35}
                        rows={8}
                        {...formik.getFieldProps('address')}
                        // placeholder="address"
                      />
                      <label htmlFor="address">address</label>

                      <div className="ms-4">
                        {formik.touched.address && formik.errors.address ? (
                          <div className="error">{formik.errors.address}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 flex">
                  <button type="submit" className="button gradient-bg">
                    Register
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignupForm;
