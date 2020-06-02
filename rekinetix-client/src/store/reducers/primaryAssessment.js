const initialState = {
  redFlags: []
};

const primaryAssessment = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RED_FLAGS_SUCCESS':
      return state;
    default:
      return state;
  }
};

export default primaryAssessment()