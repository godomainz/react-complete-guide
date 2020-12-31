import React, { Component } from "react";
import {connect} from 'react-redux';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";


interface Props {
    history: any;
    location: any;
    match: any;
    ings: any;
}

class Checkout extends Component<Props> {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ings){
            summary = (
                <div>
                    <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler} ingredients={this.props.ings}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
    
}

const mapStateToProps = (state:any) => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);