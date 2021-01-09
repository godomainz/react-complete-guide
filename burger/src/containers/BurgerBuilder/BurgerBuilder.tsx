import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
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

  const dispatch = useDispatch();

  const ings = useSelector((state:any)=>state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state:any)=>state.burgerBuilder.totalPrice);
  const error = useSelector((state:any)=>state.burgerBuilder.error);
  const isAuthenticated = useSelector((state:any)=>state.auth.token !== null);


  const onIngredientAdded = (ingName:string) => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName:string) => dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()),[dispatch]);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path:string) => dispatch(actions.setAuthRedirectPath(path));


  useEffect(()=>{
    onInitIngredients();
  },[onInitIngredients]);

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
    if (isAuthenticated){
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
    
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  }


    const disabledInfo = {
      ...ings
    }
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    
    if(ings){
      burger = (
        <Aux>
          <Burger ingredients={ings}/>
          <BuildControls 
              ingredientAdded={onIngredientAdded} 
              ingredientRemoved={onIngredientRemoved}
              disabled={disabledInfo}
              purchasable={updatePurchaseState(ings)}
              ordered={purchaseHandler}
              isAuth={isAuthenticated}
              price={totalPrice}/>
          </Aux>
        );

      orderSummary = <OrderSummary 
        ingredients={ings} 
        purchaseCancelled={purchaseCancelHandler} 
        purchaseContinued={purchaseContinueHandler}
        price={totalPrice}/> ;

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


export default WithErrorHandler(BurgerBuilder, axios);
