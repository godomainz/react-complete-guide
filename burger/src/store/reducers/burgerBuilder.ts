import * as actionTypes from "../actions/actionTypes";
import IngredientState from "../ingredientState";
import { updateObject } from "../../shared/utility";

const initialState: IngredientState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  }
  
const addIngredient = (state:IngredientState, action:actionTypes.AddIngredientAction) => {
    const upgradedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    } ;
    const updatedIngredients = updateObject(state.ingredients,upgradedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state:IngredientState, action:actionTypes.RemoveIngredientAction) => {
    const upgradedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    } ;
    const updatedIngs = updateObject(state.ingredients,upgradedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
   return updateObject(state, updatedSt);
}

const setIngredients = (state:IngredientState, action:actionTypes.SetIngredientsAction) => {
    return updateObject(state, {
        // ingredients: {
            //     salad: action.ingredients.salad,
            //     bacon: action.ingredients.bacon,
            //     cheese: action.ingredients.bacon,
            //     meat: action.ingredients.meat,
            // },
            ingredients: action.ingredients,
            totalPrice: initialState.totalPrice,
            error: false,
            building: false
        });
}

const fetchIngredientsFailed = (state:IngredientState, action:actionTypes.FetchIngredientsFailedAction) => {
    return updateObject(state, { error: true });
}

const reducer = (state:IngredientState=initialState, action:actionTypes.ActionTypes) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state
    }
}

export default reducer;