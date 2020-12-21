import CounterState from "./counterState";
import * as actionTypes from "./actionTypes"

const initialState: CounterState = {
    counter: 0,
    results : []
}

const reducer = (state:CounterState=initialState, action:actionTypes.ActionTypes) => {
    switch (action.type){
        case actionTypes.INCREMENT:
            const newState = Object.assign({}, state);
            newState.counter = state.counter + 1;
            return newState;
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.val
            }
        case actionTypes.SUBSTRACT:
            return {
                ...state,
                counter: state.counter - action.val
            }
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(),value: state.counter})
            }
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id, 1);
            const updatedArray = state.results.filter((result) => result.id !== action.resultElId );
            return {
                ...state,
                results: updatedArray
            }
        default:
            return state
    }
}

export default reducer;