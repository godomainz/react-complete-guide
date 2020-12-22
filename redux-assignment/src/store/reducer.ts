import PersonsState from "./personsState";
import * as actionTypes from "./actionTypes";

const initialState: PersonsState = {
    persons: [],
}

const reducer = (state:PersonsState=initialState, action:actionTypes.ActionTypes) => {
    switch (action.type){
        case actionTypes.ADD_PERSON:
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: action.name,
                age: action.age
            }
            return {
                ...state,
                persons: state.persons.concat(newPerson)
            };
        case actionTypes.DELETE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(person => person.id !== action.id)
            }

        default:
            return state
    }
}

export default reducer;