import { getData, setData } from '../../../service';
import { setErrorMessage, setSuccessMessage } from '../../../actions';
import history from '../../../history';

// #########################################################
// CONSULTATION

export const getAllHospital = () => async (dispatch) => {
  try {
    let { data } = await getData('/appointment/hospitals');
    dispatch({
      type: 'ALL_HOSPITAL',
      payload: data.data,
    });
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};

export const getAllDepartment = () => async (dispatch) => {
  try {
    let { data } = await getData('/appointment/department');
    dispatch({
      type: 'ALL_DEPARTMENT',
      payload: data.data,
    });
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};

export const getDoctors = (hospitalId, departmentId) => async (dispatch) => {
  try {
    let { data } = await setData('/appointment/doctor', {
      hospitalId,
      departmentId,
    });
    dispatch({
      type: 'ALL_DOCTOR',
      payload: data.data,
    });
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};

export const getAvailTime = (date, doctorId) => async (dispatch) => {
  try {
    let { data } = await setData('/appointment/availtime', {
      date,
      doctorId,
    });
    dispatch({
      type: 'AVAIL_TIME',
      payload: data.data,
    });
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};

export const registerConsultation =
  (bookingData, transactionData) => async (dispatch) => {
    try {
      let { data } = await setData('/appointment/register_consultation', {
        bookingData,
        transactionData,
      });
      if (data.success) {
        dispatch(setSuccessMessage(data.message));
        history.push('/history');
      } else {
        dispatch(setErrorMessage(data.message));
      }
    } catch (error) {
      dispatch(setErrorMessage(error));
    }
  };

// #########################################################
// VACCINATION

export const getAllVaccine = () => async (dispatch) => {
  try {
    let { data } = await getData('/appointment/vaccine');
    dispatch({
      type: 'ALL_VACCINE',
      payload: data.data,
    });
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};

export const bookVaccine =
  (bookingData, transactionData) => async (dispatch) => {
    try {
      let { data } = await setData('/appointment/register_vaccine', {
        bookingData,
        transactionData,
      });
      if (data.success) {
        dispatch(setSuccessMessage(data.message));
        history.push(`/history/${1}`);
      } else {
        dispatch(setErrorMessage(data.message));
      }
    } catch (error) {
      dispatch(setErrorMessage(error));
    }
  };

// #########################################################
// LISTING

export const getAllConsultation = () => async (dispatch) => {
  let { data } = await getData('/appointment/list_consultation');
  if (data.success) {
    dispatch({
      type: 'ALL_CONSULTATON',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const getAllVaccination = () => async (dispatch) => {
  let { data } = await getData('/appointment/list_vaccination');
  if (data.success) {
    dispatch({
      type: 'ALL_VACCINATION',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
