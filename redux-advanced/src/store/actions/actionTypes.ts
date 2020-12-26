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
export type StoreResultAction = {type: typeof STORE_RESULT,result:number}
export type DeleteResultAction = {type: typeof DELETE_RESULT, resultElId: number}

export type ActionTypes = IncrementAction | DecrementAction | AddAction | SubstractAction | StoreResultAction | DeleteResultAction;