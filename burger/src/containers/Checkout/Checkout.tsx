import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";


interface State {
    ingredients: Object;
}
interface Props {
    history: any;
}

class Checkout extends Component<Props> {

    state:State = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
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
              </div> 
        )
    }
    
}

export default Checkout;