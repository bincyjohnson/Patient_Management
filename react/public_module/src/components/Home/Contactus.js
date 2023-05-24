import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { sentMessage } from './action';
import { useDispatch } from 'react-redux';
import { sentMessage } from './action';

const Contactus = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.message) {
      errors.message = 'Message is required';
    }
    return errors;
  };

  const handleSubmit = (values, { resetForm }) => {
    // You can send the form data to the backend here
    console.log(values);
    dispatch(sentMessage(values));
    resetForm();
  };

  return (
    <div className="testimonial-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="text-center service-heading mb-5">
              <h2>Get In Touch</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <Formik
              initialValues={initialValues}
              validate={validateForm}
              onSubmit={handleSubmit}
            >
              <Form className="form-contact">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <Field
                        as="textarea"
                        className="form-control w-100 p-4"
                        name="message"
                        id="message"
                        cols="30"
                        rows="9"
                        placeholder="Enter Message"
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="error-message error mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <Field
                        className="form-control"
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error-message error mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <Field
                        className="form-control"
                        name="email"
                        id="email"
                        type="text"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message error mt-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="subbtn button-contactForm btn_1"
                  >
                    Send Message
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
          <div className="col-lg-4 mt-5">
            <div className="media contact-info flex">
              <span className="contact-info__icon mt-3">
                <img
                  src="https://img.icons8.com/ios/30/home--v1.png"
                  alt="home--v1"
                />
              </span>
              <div className="media-body">
                <h3>Buttonwood, California.</h3>
                <p>Rosemead, CA 91770</p>
              </div>
            </div>
            <div className="media contact-info flex">
              <span className="contact-info__icon mt-3">
                <img
                  src="https://img.icons8.com/carbon-copy/50/phone.png"
                  alt="phone"
                />
              </span>
              <div className="media-body">
                <h3>00 (440) 9865 562</h3>
                <p>Mon to Fri 9am to 6pm</p>
              </div>
            </div>
            <div className="media contact-info flex">
              <span className="contact-info__icon mt-3">
                <img
                  src="https://img.icons8.com/carbon-copy/50/new-post.png"
                  alt="new-post"
                />
              </span>
              <div className="media-body">
                <h3>support@colorlib.com</h3>
                <p>Send us your query anytime!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
