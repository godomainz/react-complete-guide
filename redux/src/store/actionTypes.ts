export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const ADD = "ADD";
export const SUBSTRACT = "SUBSTRACT";

export type IncrementAction = {type: typeof INCREMENT}
export type DecrementAction = {type: typeof DECREMENT}
export type AddAction = {type: typeof ADD}
export type SubstractAction = {type: typeof SUBSTRACT}

export const increment = ():IncrementAction => ({
    type: INCREMENT
});

export const decrement = ():DecrementAction => ({
    type: DECREMENT
});

export const add = ():AddAction => ({
    type: ADD
});

export const substract = ():SubstractAction => ({
    type: SUBSTRACT
});

export type ActionTypes = IncrementAction | DecrementAction | AddAction | SubstractAction;