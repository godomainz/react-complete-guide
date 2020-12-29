import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import { Ingredients } from "../ingredients";
export const addIngredient = (ingredientName:string):actionTypes.AddIngredientAction => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredientName
});

export const removeIngredient = (ingredientName:string):actionTypes.RemoveIngredientAction => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredientName
});

export const setIngredients = (ingredients:Ingredients):actionTypes.SetIngredientsAction =>  ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
});

export const fetchIngredientsFailed = ():actionTypes.FetchIngredientsFailedAction =>  ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => {
    return (dispatch:(func:any)=>void) => {
        axios.get('ingredients.json').then(response=>{
            const ingredients: Ingredients = {
                salad: response.data.salad,
                bacon: response.data.bacon,
                cheese: response.data.cheese,
                meat: response.data.meat
            }
            dispatch(setIngredients(ingredients));
        }).catch(error=> {
            console.error(error);
            dispatch(fetchIngredientsFailed());
        });
    }
};