import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
// import { InputType } from "../../components/UI/ElementTypes/InputType";
import  Input  from "../../components/UI/Input/Input";
import  Button  from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index" ;
import { updateObject, checkValidity } from "../../shared/utility";
import { Controls, ControlModal } from "./Controls";

interface Props {
    onAuth:(email:string, password:string, isSignUp:boolean) =>void;
    loading: boolean;
    error: any;
    isAuthenticated: boolean;
    buildingBurger: boolean;
    authRedirectPath: string;
    onSetAuthRedirectPath: (path?:string) => void;
}

const Auth = (props:Props) => {
    const [controls, setControls] = useState<Controls>(ControlModal);
    const [isSignUp, setIsSignUp] = useState<boolean>(true);
    const { onSetAuthRedirectPath, buildingBurger, authRedirectPath } = props;

    useEffect(()=>{
        if(buildingBurger && authRedirectPath !== "/"){
            onSetAuthRedirectPath(authRedirectPath);
        }
    }, [onSetAuthRedirectPath, buildingBurger, authRedirectPath]);

    const inputChangedHandler = (event:any,controlName:string) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value , controls[controlName].validation),
                touched: true
            })
        });
        setControls(updatedControls)
    }
    
    const submitHandler = (event:any) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }

    const switchAuthModeHandler = () =>{
        setIsSignUp(!isSignUp)
    }


        const formElementsArray = [];
        for(let key in controls){
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }
        let authRedirect = null;
        if(props.isAuthenticated){
            authRedirect = <Redirect to={props.authRedirectPath} />;
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
                changed={(event:any) => inputChangedHandler(event,formElement.id)}
            /> 
            
        });

        let errorMessage = null;
        if(props.error){
            errorMessage = (
                <p className={classes.Error}>{props.error.message}</p>
            );
        }

        if(props.loading){
            form = <Spinner />;
        }

        return (
            
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={switchAuthModeHandler}>SWITCH TO {isSignUp ? "SIGNIN" : "SIGN UP"}</Button>
            </div> 
        )
    
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