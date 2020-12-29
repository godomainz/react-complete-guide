import * as actionTypes from "./actionTypes";

export const addIngredient = (ingredientName:string):actionTypes.AddIngredientAction => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredientName
});
export const removeIngredient = (ingredientName:string):actionTypes.RemoveIngredientAction => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredientName
});
