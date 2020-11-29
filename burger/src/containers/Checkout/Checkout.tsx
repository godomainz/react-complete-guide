import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

interface State {
    ingredients: Object;
    totalPrice: number;
}
interface Props {
    history: any;
    location: any;
    match: any;
}

class Checkout extends Component<Props> {

    state:State = {
        ingredients: null,
        totalPrice: 4
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        let price = 4 ;

        for (let param of query.entries()){
            // ['salad', '1']
            if(param[0] === 'price'){
                price = +param[1];
            }
            else{
                ingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({ingredients: ingredients, totalPrice: price});

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
 
        return (
              <div>
                    <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler} ingredients={this.state.ingredients}/>
                    <Route path={this.props.match.path + '/contact-data'} render={(props)=>(<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)}/>
              </div> 
        )
    }
    
}

export default Checkout;