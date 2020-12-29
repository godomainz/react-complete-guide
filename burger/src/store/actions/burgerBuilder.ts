import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const addIngredient = (ingredientName:string):actionTypes.AddIngredientAction => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredientName
});

export const removeIngredient = (ingredientName:string):actionTypes.RemoveIngredientAction => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredientName
});

export const setIngredients = (ingredients:any):actionTypes.SetIngredientsAction =>  ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
});

export const fetchIngredientsFailed = ():actionTypes.FetchIngredientsFailedAction =>  ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredient = () => {
    return (dispatch:(func:any)=>void) => {
        axios.get('ingredients.json').then(response=>{
            console.log(response.data);
            dispatch(setIngredients(response.data));
        }).catch(error=> {
            console.error(error);
            dispatch(fetchIngredientsFailed());
        });
    }
};