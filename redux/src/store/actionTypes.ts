export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const ADD = "ADD";
export const SUBSTRACT = "SUBSTRACT";

export type IncrementAction = {type: typeof INCREMENT}
export type DecrementAction = {type: typeof DECREMENT}
export type AddAction = {type: typeof ADD, val:number}
export type SubstractAction = {type: typeof SUBSTRACT, val: number}

export const increment = ():IncrementAction => ({
    type: INCREMENT
});

export const decrement = ():DecrementAction => ({
    type: DECREMENT
});

export const add = ():AddAction => ({
    type: ADD,
    val: 10
});

export const substract = ():SubstractAction => ({
    type: SUBSTRACT,
    val: 15
});

export type ActionTypes = IncrementAction | DecrementAction | AddAction | SubstractAction;