import { setData } from '../../service';
import {
  loaderFalse,
  loaderTrue,
  setErrorMessage,
  setSuccessMessage,
} from '../../actions/index';

export const sentMessage = (message) => async (dispatch) => {
  try {
    dispatch(loaderTrue());
    let { data } = await setData('/auth/contactus', message);
    if (data.success) {
      dispatch(loaderFalse());
      dispatch(setSuccessMessage(data.message));
    } else {
      dispatch(setErrorMessage(data.message));
    }
  } catch (error) {
    dispatch(setErrorMessage(error));
  }
};
