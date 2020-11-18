
import React, { Component } from "react";
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';
import { AxiosInstance } from "axios";

interface State {
    error:any;
}

const WithErrorHandler = (WrappedComponent:any, axios:AxiosInstance) => {

     return class extends Component {
        state:State= {
            error: null
        }
        constructor(props:any){
            super(props);
            axios.interceptors.request.use((request) =>{
                this.setState({error: null});
                return request;
            });

            axios.interceptors.response.use(res=>res, error => {
                console.log(error.message);
                this.setState({error: error});
                return Promise.reject(error);
            })
        }


        // componentWillMount(){
        //     axios.interceptors.request.use((request) =>{
        //         this.setState({error: null});
        //         return request;
        //     });

        //     axios.interceptors.response.use(res=>res, error => {
        //         console.log(error.message);
        //         this.setState({error: error});
        //         return Promise.reject(error);
        //     })
        // }

        errorConfirmedHandler = () =>{
            this.setState({error: null});
        }

        render(){
            return (
            <Aux>
                <Modal show={this.state.error !== null} modalClosed={this.errorConfirmedHandler}>{this.state.error ? this.state.error.message : null}</Modal>
                <WrappedComponent {...this.props}/>
            </Aux>
            
            );
         }
     }

}

export default WithErrorHandler;


