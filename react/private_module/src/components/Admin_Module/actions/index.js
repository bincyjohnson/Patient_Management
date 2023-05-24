import { setErrorMessage, setSuccessMessage } from '../../../actions';
import history from '../../../history';
import { getData, setData } from '../../../service';

// CONSULTATION
export const getAllConsultation = () => async (dispatch) => {
  try {
    let { data } = await getData('/appointment/list_all_consultation');
    if (data.success) {
      dispatch({
        type: 'CONSULTATION_LIST',
        payload: data.data,
      });
    } else {
      dispatch(setErrorMessage(data.message));
    }
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};

export const viewConsultation = (id) => async (dispatch) => {
  try {
    let { data } = await getData(`/appointment/view_consult/${id}`);
    if (data.success) {
      dispatch({
        type: 'CONSULT_VIEW',
        payload: data.data,
      });
    } else {
      dispatch(setErrorMessage(data.message));
    }
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};

export const issueConsultationCertificate = (issueData) => async (dispatch) => {
  try {
    let { data } = await setData(`/certificate/issue_consultation`, issueData);
    if (data.success) {
      history.push('/certificate');
      dispatch(setSuccessMessage(data.message));
      window.location.reload();
    } else {
      dispatch(setErrorMessage(data.message));
    }
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};

// VACCINATION
export const getAllVaccination = () => async (dispatch) => {
  try {
    let { data } = await getData('/appointment/list_all_vaccination');
    if (data.success) {
      dispatch({
        type: 'VACCINATION_LIST',
        payload: data.data,
      });
    } else {
      dispatch(setErrorMessage(data.message));
    }
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};

export const viewVaccination = (id) => async (dispatch) => {
  try {
    let { data } = await getData(`/appointment/view_vaccine/${id}`);
    if (data.success) {
      dispatch({
        type: 'VACCINE_VIEW',
        payload: data.data,
      });
    } else {
      dispatch(setErrorMessage(data.message));
    }
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};

export const issueVaccinationCertificate = (issueData) => async (dispatch) => {
  try {
    let { data } = await setData(`/certificate/issue_vaccination`, issueData);
    if (data.success) {
      history.push('/certificate');
      dispatch(setSuccessMessage(data.message));
      window.location.reload();
    } else {
      dispatch(setErrorMessage(data.message));
    }
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};

// MESSAGE

export const getAllMessages = () => async (dispatch) => {
  let { data } = await getData('/contact/messages');
  if (data.success) {
    dispatch({
      type: 'GET_MESSAGES',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const messageView = (id) => async (dispatch) => {
  let { data } = await getData(`/contact/messages_view/${id}`);
  if (data.success) {
    dispatch({
      type: 'VIEW_MESSAGES',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
