import {createStore} from "redux";
import {incCounter,addCounter,INC_COUNTER, ADD_COUNTER, ActionTypes } from "./actionTypes";

 interface CounterState {
     counter: number;
 }

const initialState = { counter:0 }

// Reducer
const rootReducer = (state:CounterState=initialState,action:ActionTypes)=> {
    if(action.type === INC_COUNTER){
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if(action.type === ADD_COUNTER){
        return {
            ...state, 
            counter: state.counter + action.value
        }
    }

    // switch (action.type){
    //     case INC_COUNTER: {
    //         return {
    //             ...state,
    //             counter: state.counter + 1
    //         }
    //     }
    //     case ADD_COUNTER: {
    //         return {
    //             ...state,
    //             counter: state.counter + 10
    //         }
    //     }
    //     default:{
    //         return {...state};
    //     }
            
    // }

    return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(()=>{
    console.log("[Subscription]", store.getState());
})

// Dispatching Action

store.dispatch(incCounter());
console.log(store.getState());
store.dispatch(addCounter());
console.log(store.getState());

