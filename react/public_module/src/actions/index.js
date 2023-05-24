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
export const islogin = (loginData) => async (dispatch) => {
  let { data } = await setData('/auth/login', loginData);
  if (data.success) {
    localStorage.setItem('accessTocken', data?.data?.accessTocken);
    dispatch({
      type: 'IS_LOGIN',
      payload: data.data.role,
      permission: data.data.permission,
    });
    dispatch(setSuccessMessage('Login success'));

    history.push('/dashboard');
  } else {
    dispatch(setErrorMessage(data?.data?.message));
    history.push('/');
  }
};

export const setProfile = () => async (dispatch) => {
  let tocken = localStorage.getItem('accessTocken');
  let { data } = await setData('/permission/profile', { accessTocken: tocken });
  // console.log(data);
  dispatch({
    type: 'IS_LOGIN',
    permission: data.data.permission,
    payload: data.data.role,
  });
};

export const setPermission = (role, data) => async (dispatch) => {
  // console.log(role, data.role);
  if (role === data.role) {
    console.log('first');
    dispatch({
      type: 'IS_LOGIN',
      permission: data.data,
      payload: role,
    });
  }
};

// action for logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('accessTocken');
  //   Cookies.remove('accessTocken');
  dispatch({
    type: 'LOGOUT',
  });
  history.push('/');
};

// GALLERY

export const getAllImages = () => async (dispatch) => {
  try {
    let { data } = await getData('/gallery/get_images');
    if (data.success) {
      dispatch({
        type: 'GET_ALL_IMAGES',
        payload: data.data,
      });
    } else {
      dispatch(setErrorMessage(data.message));
    }
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};
