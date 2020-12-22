import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../stroe/actions';

import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

interface State {
  purchasing:boolean,
  loading:boolean,
  error:boolean
}
interface Props {
  history: any,
  onIngredientAdded:any,
  onIngredientRemoved:any,
  ings:any,
  totalPrice:number
}

class BurgerBuilder extends Component<Props> {
  state: State = {
    purchasing: false,
    loading: false,
    error:false
  }

  componentDidMount(){
    console.log(this.props);
    // axios.get('ingredients.json').then(response=>{
    //   this.setState({ingredients: response.data});
    // }).catch(error=> {
    //   console.error(error);
    //   this.setState({error: true})
    // });
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
    // alert('You Continue');
    const queryParams = [];

    for(let i in this.props.ings){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
    }
    queryParams.push('price='+this.props.totalPrice)
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: "/checkout",
      search: '?'+ queryString
    });
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    
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

    if(this.state.loading){
      orderSummary = <Spinner/>;
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
      ings: state.ingredients,
      totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
      onIngredientAdded: (ingName:string) => dispatch(actionTypes.addIngredient(ingName)),
      onIngredientRemoved : (ingName:string) => dispatch(actionTypes.removeIngredient(ingName))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
