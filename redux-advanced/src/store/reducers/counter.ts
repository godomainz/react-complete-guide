import CounterState from "../states/counterState";
import * as actionTypes from "../actions/actionTypes"
import { updatedObject } from "../utility";
const initialState: CounterState = {
    counter: 0,
}

const reducer = (state:CounterState=initialState, action:actionTypes.ActionTypes) => {
    switch (action.type){
        case actionTypes.INCREMENT:
            return updatedObject(state,{counter: state.counter + 1});
        case actionTypes.DECREMENT:
            return updatedObject(state,{counter: state.counter - 1});
        case actionTypes.ADD:
            return updatedObject(state,{counter: state.counter + action.val});
        case actionTypes.SUBSTRACT:
            return updatedObject(state,{counter: state.counter - action.val});
        default:
            return state
    }
}

export default reducer;