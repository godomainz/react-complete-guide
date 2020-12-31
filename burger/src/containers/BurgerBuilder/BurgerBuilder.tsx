import React, { Component } from "react";
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

interface State {
  purchasing:boolean
}
interface Props {
  history: any,
  onIngredientAdded:any,
  onIngredientRemoved:any,
  onInitIngredients:any,
  ings:any,
  totalPrice:number,
  error:boolean
}

class BurgerBuilder extends Component<Props> {
  state: State = {
    purchasing: false
  }

  componentDidMount(){
    console.log(this.props);
    this.props.onInitIngredients();
  }

  updatePurchaseState(updatedIngredients:any) {
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

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    
    if(this.props.ings){
      console.log(this.props)
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls 
              ingredientAdded={this.props.onIngredientAdded} 
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              purchasable={this.updatePurchaseState(this.props.ings)}
              ordered={this.purchaseHandler}
              price={this.props.totalPrice}/>
          </Aux>
        );

      orderSummary = <OrderSummary 
        ingredients={this.props.ings} 
        purchaseCancelled={this.purchaseCancelHandler} 
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.totalPrice}/> ;

    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state:any) => {
  return {
      ings: state.burgerBuilder.ingredients,
      totalPrice: state.burgerBuilder.totalPrice,
      error : state.burgerBuilder.error
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
      onIngredientAdded: (ingName:string) => dispatch(burgerBuilderActions.addIngredient(ingName)),
      onIngredientRemoved : (ingName:string) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
      onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()) 
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
