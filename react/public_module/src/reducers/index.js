import { combineReducers } from 'redux';
// import { adminReducer } from '../components/admin_management/reducers';
// import { permissionReducer } from '../components/permissions/reducers';
// import { eventReducer } from '../components/event_management/reducers';
// import { venueReducer } from '../components/venue_management/reducers';
// import { bookingReducer } from '../components/booking_management/reducers';

// ===================================================================
// COMMON REDUCER

const initialStateCommon = {
  isOpen: false,
  successMessage: null,
  errorMessage: null,
  loader: false,
  photos: [],
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
    case 'GET_ALL_IMAGES':
      return {
        ...state,
        photos: action.payload,
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
  role: '',
  permission: [],
};

const authReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case 'IS_LOGIN':
      return {
        ...state,
        islogin: localStorage.getItem('accessTocken'),
        role: action.payload,
        permission: action.permission,
      };
    case 'LOGOUT':
      return {
        ...state,
        role: null,
        permission: null,
      };
    default:
      return state;
  }
};

export default combineReducers({
  commonReducer,
  authReducer,
  //   adminReducer,
  //   permissionReducer,
  //   eventReducer,
  //   venueReducer,
  //   bookingReducer,
});
