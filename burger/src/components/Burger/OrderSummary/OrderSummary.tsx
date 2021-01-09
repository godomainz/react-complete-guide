import React from "react";
import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

interface Props {
    ingredients: Object;
    price: number;
    purchaseCancelled: any;
    purchaseContinued: any;
}

const OrderSummery = (props:Props) => {
    const indrentSummery = Object.keys(props.ingredients)
                    .map(igKey => {
                    return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
                    });
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delecious burger with the following ingredients:</p>
            <ul>
                {indrentSummery}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )  
}

export default OrderSummery;