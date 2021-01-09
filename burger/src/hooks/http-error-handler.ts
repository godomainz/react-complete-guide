import { useState, useEffect } from "react";


const UseHttpErrorHandler = (httpClient:any) => {
    const [error, setError] = useState(null);

    const requestInterceptor = httpClient.interceptors.request.use((req:any) => {
        setError(null);
        return req
    });

    const responseInterceptor = httpClient.interceptors.response.use((res:any)=> res, (error:any) => {
        setError(error);
        return Promise.reject(error);
    })

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.response.eject(responseInterceptor);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () =>{
        setError(null);
    }

    return [error, errorConfirmedHandler]
}
export default UseHttpErrorHandler;