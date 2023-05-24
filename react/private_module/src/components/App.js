import React, { useEffect } from 'react';
import '../index.css';
import { useSelector, useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// defined components
import IsAuth from './IsAuth';
import history from '../history';
import Navbar from './Header/Navbar';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import SignupForm from './Signup/SignupForm';
import LoginForm from './Login/LoginForm';
import { resetErrorMessage, resetSuccessMessage } from '../actions';
import NotFound from './NotFound/NotFound';
import Dashboard from './dashboard/Dashboard';
import PatientDashboard from './dashboard/PatientDashboard';
import AppointmentListing from './Patient_Module/AppointmentListing';
import ConsultationListing from './Admin_Module/Certificats/ConsultationListing';
import PatientListing from './Admin_Module/PatientListing';
import HistoryListing from './Patient_Module/HistoryListing';
import CertificateListing from './Admin_Module/Certificats/CertificateListing';
import MessageListing from './Admin_Module/MessagesListing';

// set configuration for toaster
const toastConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

function App() {
  const dispatch = useDispatch();

  const { successMessage, errorMessage } = useSelector(
    (state) => state.commonReducer
  );
  const { islogin, role, permission } = useSelector(
    (state) => state.authReducer
  );

  // useEffect for setting toaster
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, toastConfig);
      dispatch(resetSuccessMessage());
    } else if (errorMessage) {
      toast.error(errorMessage, toastConfig);
      dispatch(resetErrorMessage());
    }
  }, [successMessage, errorMessage]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <ToastContainer /> {/* toaster component */}
        <Router history={history}>
          <Navbar />
          <div style={{ flex: '1' }}>
            <Switch>
              <Route path="/" exact children={<Home />} />
              <Route path="/signup" children={<SignupForm />} />
              <Route path="/login" children={<LoginForm />} />
              {/* <Route path="/consultation" children={<ConsultationListing />} /> */}

              {role === 'Patient' ? (
                <>
                  <IsAuth path="/patientDashboard" auth={islogin}>
                    <PatientDashboard />
                  </IsAuth>

                  <IsAuth path="/appointment" auth={islogin}>
                    <AppointmentListing />
                  </IsAuth>

                  <IsAuth path="/history" auth={islogin}>
                    <HistoryListing />
                  </IsAuth>
                </>
              ) : (
                <>
                  <IsAuth path="/dashboard" auth={islogin}>
                    <Dashboard />
                  </IsAuth>
                  <IsAuth path="/patients" auth={islogin}>
                    <PatientListing />
                  </IsAuth>
                  <IsAuth path="/certificate" auth={islogin}>
                    <CertificateListing />
                  </IsAuth>
                  <IsAuth path="/messages" auth={islogin}>
                    <MessageListing />
                  </IsAuth>
                </>
              )}

              {/* 404 */}
              <Route path="/*" children={<NotFound />} />
            </Switch>
          </div>

          <div className="bg-light">
            <Footer />
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
