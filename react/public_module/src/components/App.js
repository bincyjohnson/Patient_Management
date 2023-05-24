import React, { useEffect } from 'react';
import '../index.css';
import { useSelector, useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// defined components
import history from '../history';
import Navbar from './Header/Navbar';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import { resetErrorMessage, resetSuccessMessage } from '../actions';
import NotFound from './NotFound/NotFound';

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
              {/* <Route path="/signup" children={<SignupForm />} />
              <Route path="/login" children={<LoginForm />} /> */}

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
