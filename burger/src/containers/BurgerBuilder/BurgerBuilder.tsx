import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

interface Props {
  history: any,
  onIngredientAdded:any,
  onIngredientRemoved:any,
  onInitIngredients:any,
  ings:any,
  totalPrice:number,
  error:boolean,
  isAuthenticated:boolean,
  onInitPurchase:()=>void,
  onSetAuthRedirectPath:(path:string)=>void
}

const BurgerBuilder = (props:Props) => {

  const [purchasing, setPurchasing] = useState<boolean>(false);

  useEffect(()=>{
    props.onInitIngredients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const updatePurchaseState = (updatedIngredients:any) => {
    const ingredients = {
      ...updatedIngredients
    };
    const sum = Object.keys(ingredients)
                  .map(igkey =>{
                    return ingredients[igkey];
                  }).reduce((sum,el) => {
                    return sum + el;
                  },0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated){
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
    
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  }


    const disabledInfo = {
      ...props.ings
    }
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    
    if(props.ings){
      burger = (
        <Aux>
          <Burger ingredients={props.ings}/>
          <BuildControls 
              ingredientAdded={props.onIngredientAdded} 
              ingredientRemoved={props.onIngredientRemoved}
              disabled={disabledInfo}
              purchasable={updatePurchaseState(props.ings)}
              ordered={purchaseHandler}
              isAuth={props.isAuthenticated}
              price={props.totalPrice}/>
          </Aux>
        );

      orderSummary = <OrderSummary 
        ingredients={props.ings} 
        purchaseCancelled={purchaseCancelHandler} 
        purchaseContinued={purchaseContinueHandler}
        price={props.totalPrice}/> ;

    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
}

const mapStateToProps = (state:any) => {
  return {
      ings: state.burgerBuilder.ingredients,
      totalPrice: state.burgerBuilder.totalPrice,
      error : state.burgerBuilder.error,
      isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
      onIngredientAdded: (ingName:string) => dispatch(actions.addIngredient(ingName)),
      onIngredientRemoved : (ingName:string) => dispatch(actions.removeIngredient(ingName)),
      onInitIngredients: () => dispatch(actions.initIngredients()),
      onInitPurchase: () => dispatch(actions.purchaseInit()),
      onSetAuthRedirectPath: (path:string) => dispatch(actions.setAuthRedirectPath(path))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
