import * as actionTypes from "../actions";

const initialState = {
  results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({
          id: new Date(),
          value: action.value
        })
      };
      break;
    case actionTypes.DELETE_RESULT:
      const updatedResults = state.results.filter(
        result => result.id !== action.resultId
      );
      return {
        ...state,
        results: updatedResults
      };
      break;
    default:
      return state;
  }
};

export default reducer;
