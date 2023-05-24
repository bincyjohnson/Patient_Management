import React, { useEffect } from 'react';
import './style.css';

import { Formik } from 'formik';
import {
  loginValidation,
  loginVariable,
} from '../../validations/LoginValidation';
import { useDispatch, useSelector } from 'react-redux';
import { isloginFn } from '../../actions';
import history from '../../history';

const LoginForm = () => {
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
      <section className="login-section pb-5">
        <div className="cmt">
          <div className="container">
            <div className="row ">
              <div className="col-lg-5 col-xl-5 pt-5 mt-5">
                <h1 className="heading mb-5">Login</h1>

                <Formik
                  initialValues={loginVariable}
                  validationSchema={loginValidation}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(isloginFn(values));
                  }}
                >
                  {(formik) => (
                    <form
                      onSubmit={formik.handleSubmit}
                      className="container signup-section"
                    >
                      {/* email */}
                      <div className="container-input flex-c">
                        <div className="formfield " id="input_field">
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

                      {/* password */}
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
                            {formik.touched.password &&
                            formik.errors.password ? (
                              <div className="error">
                                {formik.errors.password}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="flex mt-4">
                        <button type="submit" className="button gradient-bg">
                          Login
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
              <div className="col-lg-7">
                <img src="https://preview.colorlib.com/theme/medico/img/banner_img.png.webp" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
