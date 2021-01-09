import { Reducer, useReducer, useCallback } from "react";

type HttpStateType = {
    loading:boolean;
    error?: string | null;
    data?: string | null;
}

type ActionType = {
    type: "SEND" | "RESPONSE" | "ERROR" | "CLEAR";
    errorMessage?: string | null;
    responseData?: string | null;
}

const httpReducer = (curHttpState:HttpStateType, action:ActionType):HttpStateType => {
    switch(action.type){
      case "SEND":
        return { loading: true, error: null, data: null};
      case "RESPONSE":
        return {...curHttpState, loading: false, data: action.responseData};
      case "ERROR":
        return {loading: false, error: action.errorMessage};
      case "CLEAR":
        return {...curHttpState, error: null};
      default:
        throw new Error("Should not be reached!");
    }
  }

const useHttp = () => {
    const [httpState, dispatchHttp]= useReducer<Reducer<HttpStateType, ActionType>>(httpReducer, {loading: false, error: null, data: null});
    
    const sendRequest = useCallback((url:string, method: string, body?:any) => {
        dispatchHttp({type:"SEND"});
        fetch(url,{
            method:method,
            body: body,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            return response.json();
        }).then(responseData=>{
            dispatchHttp({ type: "RESPONSE", responseData: responseData})
        }).catch(error=>{
            dispatchHttp({type:"ERROR", errorMessage: error.message});
        });
    },[])
    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest : sendRequest
    };
}

export default useHttp;