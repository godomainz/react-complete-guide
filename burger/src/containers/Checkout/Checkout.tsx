import React from "react";
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

const Checkout = (props:Props) => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }


    let summary = <Redirect to="/"/>;
    if(props.ings){
        const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;

        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary checkoutCancelled={checkoutCancelledHandler} checkoutContinued={checkoutContinuedHandler} ingredients={props.ings}/>
                <Route path={props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        );
    }
    return summary; 
}

const mapStateToProps = (state:any) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);