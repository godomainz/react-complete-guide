import CounterState from "../counterState";
import * as actionTypes from "../actionTypes"

const initialState: CounterState = {
    counter: 0,
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
        default:
            return state
    }
}

export default reducer;