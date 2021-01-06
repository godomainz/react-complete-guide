import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { InputType } from "../../components/UI/ElementTypes/InputType";
import  Input  from "../../components/UI/Input/Input";
import  Button  from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index" ;
import { updateObject } from "../../shared/utility";

interface Props {
    onAuth:(email:string, password:string, isSignUp:boolean) =>void;
    loading: boolean;
    error: any;
    isAuthenticated: boolean;
    buildingBurger: boolean;
    authRedirectPath: string;
    onSetAuthRedirectPath: (path?:string) => void;
}

interface State {
    controls: {
        email: InputType;
        password: InputType;
    },
    isSignUp: boolean;
}

class Auth extends Component<Props,State> {

    state: State = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if(this.props.buildingBurger && this.props.authRedirectPath !== "/"){
            this.props.onSetAuthRedirectPath(this.props.authRedirectPath);
        }
    }

    checkValidity(value:string, rules:any){
        let isValid = true;
        if(!rules){
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }



    inputChangedHandler = (event:any,controlName:string) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid: this.checkValidity(event.target.value , this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls});
    }
    
    submitHandler = (event:any) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () =>{
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        });
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        let form:JSX.Element[]|JSX.Element= formElementsArray.map((formElement)=>{
            return <Input 
                key={formElement.id} 
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event:any) => this.inputChangedHandler(event,formElement.id)}
            /> 
            
        });

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p className={classes.Error}>{this.props.error.message}</p>
            );
        }

        if(this.props.loading){
            form = <Spinner />;
        }

        return (
            
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGN UP"}</Button>
            </div> 
        )
    } 
    
}

const mapStateToProps = (state:any) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = (dispatch:any) => {
    return {
        onAuth: (email:string, password:string, isSignup:boolean) => dispatch(actions.auth(email, password,isSignup)),
        onSetAuthRedirectPath: (path:string) => dispatch(actions.setAuthRedirectPath(path))
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Auth);