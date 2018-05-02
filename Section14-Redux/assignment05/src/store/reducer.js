import * as actionTypes from "./actions";

const initialState = {
  persons: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PERSON_ADD:
      const newPerson = {
        id: Math.random(),
        name: action.payload.name,
        age: action.payload.age
      };
      return {
        ...state,
        persons: state.persons.concat(newPerson)
      };
      break;
    case actionTypes.PERSON_REMOVE:
      return {
        persons: state.persons.filter(person => person.id !== action.personId)
      };
      break;
    default:
      return state;
      break;
  }

  return state;
};

export default reducer;
