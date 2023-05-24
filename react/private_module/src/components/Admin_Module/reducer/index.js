const initialState = {
  listConsultation: [],
  listVaccination: [],
  viewConsult: {},
  viewVaccine: {},
  messages: [],
  viewMessage: {},
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONSULTATION_LIST':
      return {
        ...state,
        listConsultation: action.payload,
      };

    case 'VACCINATION_LIST':
      return {
        ...state,
        listVaccination: action.payload,
      };

    case 'CONSULT_VIEW':
      return {
        ...state,
        viewConsult: action.payload,
      };
    case 'VACCINE_VIEW':
      return {
        ...state,
        viewVaccine: action.payload,
      };

    case 'GET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      };

    case 'VIEW_MESSAGES':
      return {
        ...state,
        viewMessage: action.payload,
      };

    default:
      return state;
  }
};
