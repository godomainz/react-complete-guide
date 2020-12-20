import CounterState from "./counterState";
import {ActionTypes,INCREMENT,DECREMENT,ADD,SUBSTRACT} from "./actionTypes"
const initialState: CounterState = {
    counter: 0
}
const reducer = (state:CounterState=initialState, action:ActionTypes) => {
    if(action.type ===  INCREMENT){
        return {
            counter: state.counter + 1
        }
    }
    if(action.type ===  DECREMENT){
        return {
            counter: state.counter - 1
        }
    }
    if(action.type ===  ADD){
        return {
            counter: state.counter + action.val
        }
    }
    if(action.type ===  SUBSTRACT){
        return {
            counter: state.counter - action.val
        }
    }
    return state;
}
export default reducer;