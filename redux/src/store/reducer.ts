import CounterState from "./counterState";
import {ActionTypes,INCREMENT,DECREMENT,ADD,SUBSTRACT} from "./actionTypes"

const initialState: CounterState = {
    counter: 0
}

const reducer = (state:CounterState=initialState, action:ActionTypes) => {
    switch (action.type){
        case INCREMENT:
            return {
                counter: state.counter + 1
            }
        case DECREMENT:
            return {
                counter: state.counter - 1
            }
        case ADD:
            return {
                counter: state.counter + action.val
            }
        case SUBSTRACT:
            return {
                counter: state.counter - action.val
            }
        default:
            return {
                counter: 0
            }
    }
}

export default reducer;