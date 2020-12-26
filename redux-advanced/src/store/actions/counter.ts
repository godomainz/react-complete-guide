import * as actionTypes from "./actionTypes"
export const increment = ():actionTypes.IncrementAction => ({
    type: actionTypes.INCREMENT
});

export const decrement = ():actionTypes.DecrementAction => ({
    type: actionTypes.DECREMENT
});

export const add = (value:number):actionTypes.AddAction => ({
    type: actionTypes.ADD,
    val: value
});

export const substract = (value:number):actionTypes.SubstractAction => ({
    type: actionTypes.SUBSTRACT,
    val: value
});