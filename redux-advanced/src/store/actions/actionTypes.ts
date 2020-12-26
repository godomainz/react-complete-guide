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

export const increment = ():IncrementAction => ({
    type: INCREMENT
});

export const decrement = ():DecrementAction => ({
    type: DECREMENT
});

export const add = (value:number):AddAction => ({
    type: ADD,
    val: value
});

export const substract = (value:number):SubstractAction => ({
    type: SUBSTRACT,
    val: value
});

export const saveResult = (result:number):StoreResultAction => {
    return {
        type: STORE_RESULT,
        result: result
    }
}
export const storeResult = (result:number) => {
    return (dispatch:any) => {
        setTimeout(() => {
            dispatch(saveResult(result));
        },5000);
    }
};

export const deleteResult = (id:number):DeleteResultAction => ({
    type: DELETE_RESULT,
    resultElId: id
});

export type ActionTypes = IncrementAction | DecrementAction | AddAction | SubstractAction | StoreResultAction | DeleteResultAction;