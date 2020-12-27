import * as actionTypes from "./actionTypes";

export const saveResult = (result:number):actionTypes.StoreResultAction => {
    return {
        type: actionTypes.STORE_RESULT,
        result: result
    }
}
export const storeResult = (result:number) => {
    return (dispatch:any,getState:()=>any) => {
        setTimeout(() => {
            // const oldCounter = getState().ctr.counter;
            // console.log("oldCounter ",oldCounter);
            dispatch(saveResult(result));
        },5000);
    }
};

export const deleteResult = (id:number):actionTypes.DeleteResultAction => ({
    type: actionTypes.DELETE_RESULT,
    resultElId: id
});