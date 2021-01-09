
import React, { useState, useEffect } from "react";
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';
import { AxiosInstance } from "axios";

const withErrorHandler = (WrappedComponent:any, axios:AxiosInstance) => {

     return (props:any) => {
        
        const [error, setError] = useState(null);

        const requestInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req
        });

        const responseInterceptor = axios.interceptors.response.use(res=> res, error => {
            setError(error);
            return Promise.reject(error);
        })

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            };
        },[requestInterceptor, responseInterceptor]);

        const errorConfirmedHandler = () =>{
            setError(null);
        }     
        return (
            <Aux>
                <Modal show={error} modalClosed={errorConfirmedHandler}>{error ? error.message : null}</Modal>
                <WrappedComponent {...props}/>
            </Aux>
        );
     };
};

export default withErrorHandler;


