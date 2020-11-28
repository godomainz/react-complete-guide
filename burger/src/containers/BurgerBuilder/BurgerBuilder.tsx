import React, { Component } from "react";
import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

interface State {
  ingredients:any,
  totalPrice:number,
  purchasable:boolean,
  purchasing:boolean,
  loading:boolean,
  error:boolean
}
interface Props {
  history: any
}

class BurgerBuilder extends Component<Props> {
  state: State = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error:false
  }

  componentDidMount(){
    console.log(this.props);
    axios.get('ingredients.json').then(response=>{
      this.setState({ingredients: response.data});
    }).catch(error=> {
      console.error(error);
      this.setState({error: true})
    });
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
    this.setState({ purchasable: sum > 0});
  }

  addIngredientHandler = (type:string) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: Math.round((newPrice + Number.EPSILON) * 100) / 100, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type:string) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({totalPrice: Math.round((newPrice + Number.EPSILON) * 100) / 100, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);

  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // alert('You Continue');
    // this.setState({loading:true});
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Akila Mendis',
    //     address: {
    //       street: 'Teststreet 1',
    //       zipCode: '41351',
    //       country: 'Sri Lanka'
    //     },
    //     email: 'test@test.com',
    //     deliveryMethod: 'fastest'
    //   }
    // };
    // console.log(order)
    // axios.post('/orders.json', order)
    //       .then(response => {
    //         this.setState({loading:false, purchasing: false});
    //         console.log(response);
    //       })
    //       .catch(error => {
    //         this.setState({loading:false, purchasing: false})
    //         console.log(error);
    //       });

    this.props.history.push("/checkout");
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    
    if(this.state.ingredients){

      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
              ingredientAdded={this.addIngredientHandler} 
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabledInfo}
              purchasable={this.state.purchasable}
              ordered={this.purchaseHandler}
              price={this.state.totalPrice}/>
          </Aux>
        );

      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients} 
        purchaseCancelled={this.purchaseCancelHandler} 
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}/> ;

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

export default WithErrorHandler(BurgerBuilder, axios);
