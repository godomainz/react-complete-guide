import CounterState from "./counterState";
import {ActionTypes,INCREMENT,DECREMENT,ADD,SUBSTRACT,STORE_RESULT,DELETE_RESULT} from "./actionTypes"

const initialState: CounterState = {
    counter: 0,
    results : []
}

const reducer = (state:CounterState=initialState, action:ActionTypes) => {
    switch (action.type){
        case INCREMENT:
            const newState = Object.assign({}, state);
            newState.counter = state.counter + 1;
            return newState;
        case DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case ADD:
            return {
                ...state,
                counter: state.counter + action.val
            }
        case SUBSTRACT:
            return {
                ...state,
                counter: state.counter - action.val
            }
        case STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(),value: state.counter})
            }
        default:
            return state
    }
}

export default reducer;