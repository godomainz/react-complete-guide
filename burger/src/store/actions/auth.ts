import * as actionTypes from "./actionTypes";
import axios from "axios";

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

export const authFail = (error:any): actionTypes.AuthFailAction => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
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
            dispatch(authSuccess(response.data));
        }).catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        });
    }
}