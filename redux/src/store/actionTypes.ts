export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const ADD = "ADD";
export const SUBSTRACT = "SUBSTRACT";
export const STORE_RESULT = "STORE_RESULT";
export const DELETE_RESULT = "DELETE_RESULT";

export type IncrementAction = {type: typeof INCREMENT}
export type DecrementAction = {type: typeof DECREMENT}
export type AddAction = {type: typeof ADD, val:number}
export type SubstractAction = {type: typeof SUBSTRACT, val: number}
export type StoreResultAction = {type: typeof STORE_RESULT}
export type DeleteResultAction = {type: typeof DELETE_RESULT, resultElId: number}

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

export const storeResult = ():StoreResultAction => ({
    type: STORE_RESULT
});

export const deleteResult = (id:number):DeleteResultAction => ({
    type: DELETE_RESULT,
    resultElId: id
});

export type ActionTypes = IncrementAction | DecrementAction | AddAction | SubstractAction | StoreResultAction | DeleteResultAction;