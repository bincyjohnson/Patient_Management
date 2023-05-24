import { loaderTrue } from '../../../actions';
import { loaderFalse } from '../../../actions';
import { setErrorMessage, setSuccessMessage } from '../../../actions';
import history from '../../../history';
import { setData } from '../../../service';

export const addAdmins = (addData) => async (dispatch) => {
  dispatch(loaderTrue());
  let { data } = await setData('/auth/signup', addData);
  dispatch(loaderFalse());
  if (data.success) {
    dispatch(setSuccessMessage(data.message));
    // dispatch(getAllAdmin());
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
