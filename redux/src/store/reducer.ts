import CounterState from "./counterState";
const initialState: CounterState = {
    counter: 0
}
const reducer = (state:CounterState=initialState, action:any) => {
    return state;
}
export default reducer;