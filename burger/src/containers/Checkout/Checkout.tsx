import React, { Component } from "react";
import {connect} from 'react-redux';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

interface Props {
    history?: any;
    location?: any;
    match?: any;
    ings?: any;
    purchased?: boolean;
}

class Checkout extends Component<Props> {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/"/>;
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;

            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler} ingredients={this.props.ings}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            );
        }
        return summary;
    }
    
}

const mapStateToProps = (state:any) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);