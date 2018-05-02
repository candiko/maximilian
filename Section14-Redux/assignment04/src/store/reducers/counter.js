import * as actionTypes from "../actions";

const initialState = {
  counter: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
      break;
    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    case actionTypes.ADD_5:
      return {
        ...state,
        counter: state.counter + action.value
      };
    case actionTypes.DEC_5:
      return {
        ...state,
        counter: state.counter - action.value
      };
    default:
      return state;
  }
};

export default reducer;
