import { editData, getData, setData, deleteData } from '../service';
import history from '../history';
// ===================================================================
// COMMON ACTIONS

// toaster for success messsage
export const setSuccessMessage = (data) => (dispatch) => {
  dispatch({
    type: 'SUCCESS_MESSAGE',
    payload: data,
  });
};

// toaster for error message
export const setErrorMessage = (data) => (dispatch) => {
  dispatch({
    type: 'ERROR_MESSAGE',
    payload: data,
  });
};

// reset  success message toaster
export const resetSuccessMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_SUCCESS_MESSAGE',
  });
};

// reset error message toaster
export const resetErrorMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_ERROR_MESSAGE',
  });
};

export const loaderTrue = () => (dispatch) => {
  dispatch({
    type: 'LOADER_TRUE',
  });
};

export const loaderFalse = () => (dispatch) => {
  dispatch({
    type: 'LOADER_FALSE',
  });
};

// ===================================================================
// AUTH ACTIONS

// action for login
export const isloginFn = (loginData) => async (dispatch) => {
  let { data } = await setData('/auth/login', loginData);
  console.log(data);
  if (data.success) {
    localStorage.setItem('accessTocken', data?.data?.accessTocken);
    localStorage.setItem('role', data?.data?.role);

    dispatch({
      type: 'IS_LOGIN',
      payload: data.data.role,
    });
    dispatch(setSuccessMessage('Login success'));
    if (data.data.role === 'Patient') {
      history.push('/patientDashboard');
    } else {
      history.push('/dashboard');
    }
  } else {
    dispatch(setErrorMessage(data?.message));
  }
};

// action for logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('accessTocken');
  localStorage.removeItem('role');

  dispatch({
    type: 'LOGOUT',
  });
  window.location.href = 'http://localhost:3456';
};

// profile api
export const setProfile = () => async (dispatch) => {
  let { data } = await getData('/auth/profile');
  // console.log(data.data.permission);
  dispatch({
    type: 'IS_LOGIN',
    permission: data.data.permission,
    payload: data.data.role,
    profile: data.data.profile,
  });
};

export const changePassword = (changeData) => async (dispatch) => {
  let { data } = await setData('/admin/changePswd', changeData);
  if (data.success) {
    dispatch(setSuccessMessage('Password changed. Please Login again'));

    setTimeout(() => {
      dispatch(logout());
    }, 2000);

    // history.push('/dashboard');
  } else {
    dispatch(setErrorMessage(data?.message));
  }
};
