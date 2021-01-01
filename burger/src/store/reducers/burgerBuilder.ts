import * as actionTypes from "../actions/actionTypes";
import IngredientState from "../ingredientState";
import { updateObject } from "../utility";

const initialState: IngredientState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  }
  

const reducer = (state:IngredientState=initialState, action:actionTypes.ActionTypes) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            const upgradedIngredient = {
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            } ;
            const updatedIngredients = updateObject(state.ingredients,upgradedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
           return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const upgradedIng = {
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            } ;
            const updatedIngs = updateObject(state.ingredients,upgradedIng);
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
           return updateObject(state, updatedSt);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                // ingredients: {
                    //     salad: action.ingredients.salad,
                    //     bacon: action.ingredients.bacon,
                    //     cheese: action.ingredients.bacon,
                    //     meat: action.ingredients.meat,
                    // },
                    ingredients: action.ingredients,
                    totalPrice: initialState.totalPrice,
                    error: false
                });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default:
            return state
    }
}

export default reducer;