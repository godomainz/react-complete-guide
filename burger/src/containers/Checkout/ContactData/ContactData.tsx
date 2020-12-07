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
    name: string;
    email: string;
    address: {
        street: string;
        postalCode: string;
    };
    loading:boolean;

}

class ContactData extends Component<Props, State> {

    state:State = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false,
    }

    orderHandler = (event:any) => {
        event.preventDefault();
        this.setState({loading:true});
        const order = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
        customer: {
            name: 'Akila Mendis',
            address: {
            street: 'Teststreet 1',
            zipCode: '41351',
            country: 'Sri Lanka'
            },
            email: 'test@test.com',
            deliveryMethod: 'fastest'
        }
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
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your Name"></Input>
                <Input inputtype="input" type="email" name="email" placeholder="Your Mail"></Input>
                <Input inputtype="input" type="text" name="street" placeholder="Street"></Input>
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"></Input>
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