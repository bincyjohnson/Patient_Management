import { combineReducers } from 'redux';
import { patientReducer } from '../components/Patient_Module/reducer';
import { adminReducer } from '../components/Admin_Module/reducer';

// ===================================================================
// COMMON REDUCER

const initialStateCommon = {
  isOpen: false,
  successMessage: null,
  errorMessage: null,
  loader: false,
  count: [],
};
const commonReducer = (state = initialStateCommon, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'RESET_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: null,
      };
    case 'RESET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: null,
      };
    case 'LOADER_TRUE':
      return {
        ...state,
        loader: true,
      };
    case 'LOADER_FALSE':
      return {
        ...state,
        loader: false,
      };

    case 'COUNT':
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};

// ===================================================================
// AUTH REDUCER

const initialStateAuth = {
  islogin: localStorage.getItem('accessTocken')
    ? localStorage.getItem('accessTocken')
    : null,
  role: localStorage.getItem('role') ? localStorage.getItem('role') : null,
  permission: [],
  profile: {},
};

const authReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case 'IS_LOGIN':
      return {
        ...state,
        islogin: localStorage.getItem('accessTocken'),
        role: localStorage.getItem('role'),
      };

    case 'LOGOUT':
      return {
        ...state,
        role: null,
        permission: null,
        profile: null,
      };

    case 'UPDATE_PERMISSIONS':
      return {
        ...state,
        permission: action.permission,
        role: action.payload,
      };

    default:
      return state;
  }
};

export default combineReducers({
  commonReducer,
  authReducer,
  patientReducer,
  adminReducer,
});
