import * as actionTypes from "./actionTypes";
import axios from "axios";
import { getError } from "../firebaseErrors/errors";

export const authStart = (): actionTypes.AuthStartAction => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token:string, userId:string, error:any, loading:boolean ): actionTypes.AuthSuccessAction => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        error:error,
        loading: loading
    }
}

export const authFail = (error:any): actionTypes.AuthFailAction => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = (): actionTypes.AuthLogoutAction => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime:number) =>{
    return (dispatch:any) => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000);
    }
}

export const auth = (email: string, password: string, isSignup: boolean=true)=> {
    return (dispatch:(func:any)=>void) => {
        dispatch(authStart());
        const apikey:string = "AIzaSyB-69umKTGmos24h7rKeuwCi-NpYqQNp5s";
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let urlWithoutKey = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
        if(!isSignup){
            urlWithoutKey = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
        }
        const url = `${urlWithoutKey}${apikey}`;
        axios.post(url, authData).then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId, null, false));
            dispatch(checkAuthTimeout(parseInt(response.data.expiresIn)));
        }).catch(err=>{
            const error = err.response.data.error ;
            const errorMessage = getError(error.message);
            const updatedError = {...error, message:errorMessage};
            dispatch(authFail(updatedError));
        });
    }
}

export const setAuthRedirectPath = (path:string): actionTypes.SetAuthRedirectPathAction =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
