const initialState = {
  counter: 0,
  results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1
      };
      break;
    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - 1
      };
    case "ADD_5":
      return {
        ...state,
        counter: state.counter + action.value
      };
    case "DEC_5":
      return {
        ...state,
        counter: state.counter - action.value
      };
    case "STORE_RESULT":
      return {
        ...state,
        results: state.results.concat({ id: new Date(), value: state.counter })
      };
      break;
    case "DELETE_RESULT":
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
