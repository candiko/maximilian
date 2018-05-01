const initialState = {
  counter: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        counter: state.counter + 1
      };
      break;
    case "DECREMENT":
      return {
        counter: state.counter - 1
      };
    case "ADD_5":
      return {
        counter: state.counter + action.value
      };
    case "DEC_5":
      console.log(action);
      return {
        counter: state.counter - action.value
      };
    default:
      return state;
  }
};

export default reducer;
