import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

interface Props {
    ingredients:any;
    totalPrice?:number;
    history: any;
}
interface State{
    orderForm:{
        name: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string,
            validation?: {
                required?: boolean
            },
            valid: boolean,
            touched: boolean
        };
        street: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string,
            validation?: {
                required?: boolean
            },
            valid: boolean,
            touched: boolean
        };
        zipCode?: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string,
            validation?: {
                required?: boolean,
                minLength?: number,
                maxLength?: number
            },
            valid: boolean,
            touched: boolean
        };
        country?: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string,
            validation?: {
                required?: boolean
            },
            valid: boolean,
            touched: boolean
        };
        email: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string,
            validation?: {
                required?: boolean
            },
            valid: boolean,
            touched: boolean
        };
        deliveryMethod: {
            elementType: string,
            elementConfig: {
                options: {value: string, displayValue: string}[] 
            },
            value:string,
            valid: boolean
        };
        
    };
    formIsValid: boolean;
    loading:boolean;

}

class ContactData extends Component<Props, State> {

    state:State = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: '',
                    valid: true
                }    
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event:any) => {
        event.preventDefault();
        this.setState({loading:true});
        const formData = {};

        for (let formElementIdentifier in this.state.orderForm ){

            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
            
        };
        console.log(order)
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading:false})
                console.log(error);
            });
    }

    checkValidity(value:string, rules:any){
        let isValid = true;
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength){
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if (rules.maxLength){
            isValid = value.trim().length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event:any,inputIdentifier:string) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
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
        if (this.state.loading){
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

export default ContactData;