import CounterState from "./counterState";
import {ActionTypes,INCREMENT} from "./actionTypes"
const initialState: CounterState = {
    counter: 0
}
const reducer = (state:CounterState=initialState, action:ActionTypes) => {
    if(action.type ===  INCREMENT){
        return {
            counter: state.counter + 1
        }
    }
    return state;
}
export default reducer;