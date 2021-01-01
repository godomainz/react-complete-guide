import React, { Component } from "react";
import Order from "../../../components/Order/Order";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { connect } from 'react-redux';
import Spinner from "../../../components/UI/Spinner/Spinner";

interface Props {
    onfetchOrders:() => void;
    orders: any;
    loading: boolean;
}

class Orders extends Component<Props> {
 
    componentDidMount() {
        this.props.onfetchOrders();
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
        orders: state.order.orders
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onfetchOrders: () => dispatch(actions.fetchOrders())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));