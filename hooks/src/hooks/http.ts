import { Reducer, useReducer, useCallback } from "react";

type HttpStateType = {
    loading:boolean;
    error?: string | null;
    data?: any;
    extra?: any;
    identifier?:any;
}

type ActionType = {
    type: "SEND" | "RESPONSE" | "ERROR" | "CLEAR";
    errorMessage?: string | null;
    responseData?: any;
    extra?: any;
    identifier?:any;
}

const httpReducer = (curHttpState:HttpStateType, action:ActionType):HttpStateType => {
    switch(action.type){
      case "SEND":
        return { loading: true, error: null, data: null, extra: null, identifier: action.identifier};
      case "RESPONSE":
        return {...curHttpState, loading: false, data: action.responseData, extra: action.extra};
      case "ERROR":
        return {loading: false, error: action.errorMessage};
      case "CLEAR":
        return {...curHttpState, error: null};
      default:
        throw new Error("Should not be reached!");
    }
  }

const useHttp = () => {
    const [httpState, dispatchHttp]= useReducer<Reducer<HttpStateType, ActionType>>(httpReducer, {loading: false, error: null, data: null, extra: null, identifier:null});
    
    const sendRequest = useCallback((url:string, method: string, body?:any, reqExtra?: any, identifier?: any) => {
        dispatchHttp({type:"SEND", identifier:identifier});
        fetch(url,{
            method:method,
            body: body,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            return response.json();
        }).then(responseData=>{
            dispatchHttp({ type: "RESPONSE", responseData: responseData, extra: reqExtra})
        }).catch(error=>{
            dispatchHttp({type:"ERROR", errorMessage: error.message});
        });
    },[])
    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest : sendRequest,
        reqExtra: httpState.extra,
        reqIdentifier: httpState.identifier
    };
}

export default useHttp;