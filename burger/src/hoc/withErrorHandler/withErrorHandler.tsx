
import React from "react";
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';
import { AxiosInstance } from "axios";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const WithErrorHandler = (WrappedComponent:any, axios:AxiosInstance) => {
     const Component = (props:any) => {
        const [error, clearError] = useHttpErrorHandler(axios);
        return (
            <Aux>
                <Modal show={error} modalClosed={clearError}>{error ? error.message : null}</Modal>
                <WrappedComponent {...props}/>
            </Aux>
        );
     };
     return Component;
};

export default WithErrorHandler;


