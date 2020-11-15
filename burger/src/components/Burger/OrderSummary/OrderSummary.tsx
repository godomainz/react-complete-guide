import React from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

const  OrderSummary = (props:any) => {
    const indrentSummery = Object.keys(props.ingredients)
                            .map(igKey => {
                            return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
                            });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delecious burger with the following ingredients:</p>
            <ul>
                {indrentSummery}
            </ul>
            <p>Continue to Checkout ?</p>
            <Button btnType='Danger'>CANCEL</Button>
            <Button btnType='Success'>CONTINUE</Button>
        </Aux>
    );
    
}

export default OrderSummary;