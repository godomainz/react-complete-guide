import React, { Component } from "react";
import Order from "../../../components/Order/Order";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { connect } from 'react-redux';
import Spinner from "../../../components/UI/Spinner/Spinner";

interface Props {
    onfetchOrders:(token:string,userId:string) => void;
    orders: any;
    loading: boolean;
    token: string;
    userId:string;
}

class Orders extends Component<Props> {
 
    componentDidMount() {
        this.props.onfetchOrders(this.props.token, this.props.userId);
    }

    render(){
        let orders = <Spinner />;
        if (!this.props.loading){
            orders = this.props.orders.map((order:any) => (
                            <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                    ))
        }
        
        return (
            <div>
                {orders}
            </div> 
        )
    }
    
}

const mapStateToProps = (state:any) => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onfetchOrders: (token:string, userId:string) => dispatch(actions.fetchOrders(token, userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));