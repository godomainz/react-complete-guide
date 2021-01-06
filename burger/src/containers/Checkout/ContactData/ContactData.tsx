import React, { Component } from "react";
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

interface State{
    orderForm: OrderForm;
    formIsValid: boolean;
}

class ContactData extends Component<Props, State> {

    state:State = {
        orderForm: OrderFormModel,
        formIsValid: false
    }

    orderHandler = (event:any) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm ){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
            
        };
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event:any,inputIdentifier:string) => {

        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
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
                            changed={(event:any) => this.inputChangedHandler(event,formElement.id)}>
                        </Input>
                    )
                }
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading){
            form = <Spinner />;
        }

        return (
              <div className={classes.ContactData}>
                  <h4>Enter your contact Data</h4>
                  {form}
              </div> 
        )
    }   
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