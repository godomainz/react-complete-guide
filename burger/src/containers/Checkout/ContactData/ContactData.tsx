import React, { useState } from "react";
import {connect} from 'react-redux';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { OrderForm, OrderFormModel } from "./OrderForm";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

interface Props {
    ings:any;
    price:number;
    history: any;
    loading: boolean;
    onOrderBurger:(orderData:any, token:string)=>any;
    token:string;
    userId:string;
}

const ContactData = (props:Props) => {

    const [orderForm, setOrderForm] = useState<OrderForm>(OrderFormModel);
    const [formIsValid, setFormIsValid] = useState<boolean>(false);

    const orderHandler = (event:any) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm ){
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
            
        };
        props.onOrderBurger(order, props.token);
    }

    const inputChangedHandler = (event:any,inputIdentifier:string) => {

        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid)
    }

    const formElementsArray = [];
    for(let key in orderForm){
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {
                formElementsArray.map(formElement => 
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event:any) => inputChangedHandler(event,formElement.id)}>
                    </Input>
                )
            }
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if (props.loading){
        form = <Spinner />;
    }

    return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div> 
    )
       
}

const mapStateToProps = (state:any) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onOrderBurger: (orderData:any, token: string) => dispatch(actions.purchaseBurger(orderData,token))
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));