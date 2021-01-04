import * as actionTypes from "./actionTypes";

export const authStart = (): actionTypes.AuthStartAction => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData:any): actionTypes.AuthSuccessAction => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error:string): actionTypes.AuthFailAction => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email: string, password: string)=> {
    return (dispatch:(func:any)=>void) => {
        dispatch(authStart());
    }
}