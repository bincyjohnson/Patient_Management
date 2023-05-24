const initialState = {
  hospitals: [],
  departments: [],
  doctors: [],
  availTime: [],
  vaccine: [],
  allVaccination: [],
  allConsultation: [],
};

export const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_HOSPITAL':
      return {
        ...state,
        hospitals: action.payload,
      };

    case 'ALL_DEPARTMENT':
      return {
        ...state,
        departments: action.payload,
      };

    case 'ALL_DOCTOR':
      return {
        ...state,
        doctors: action.payload,
      };

    case 'ALL_VACCINE':
      return {
        ...state,
        vaccine: action.payload,
      };

    case 'AVAIL_TIME':
      return {
        ...state,
        availTime: action.payload,
      };

    case 'ALL_CONSULTATON':
      return {
        ...state,
        allConsultation: action.payload,
      };

    case 'ALL_VACCINATION':
      return {
        ...state,
        allVaccination: action.payload,
      };

    default:
      return state;
  }
};
