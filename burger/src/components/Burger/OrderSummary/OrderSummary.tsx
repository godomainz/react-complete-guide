import React, { Component } from "react";
import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

interface Props {
    ingredients: Object;
    price: number;
    purchaseCancelled: any;
    purchaseContinued: any;
}

class OrderSummery extends Component<Props> {

    // This could be a functional component, doesn't have to be a class based component
    componentDidUpdate(){
        console.log('[OrderSummery.tsx] componentDidUpdate');
    }

    render(){
        const indrentSummery = Object.keys(this.props.ingredients)
                        .map(igKey => {
                        return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
                        });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delecious burger with the following ingredients:</p>
                <ul>
                    {indrentSummery}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout ?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }

    
}

export default OrderSummery;