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
            value:string;
        };
        street: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string;
        };
        zipCode?: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string;
        };
        country?: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string;
        };
        email: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string;
        };
        deliveryMethod: {
            elementType: string,
            elementConfig: {
                options: {value: string, displayValue: string}[] 
            },
            value:string;
        };
        postalCode?: string;
    };
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
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: ''
                }
            
        },
        loading: false,
    }

    orderHandler = (event:any) => {
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice
            
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

    render(){

        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                
                {
                    formElementsArray.map(formElement => 
                        <Input 
                        key={formElement.config.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}></Input>
                    )
                }
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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