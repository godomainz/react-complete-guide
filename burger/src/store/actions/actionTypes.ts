export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

export type AddIngredientAction = {type: typeof ADD_INGREDIENT, ingredientName:string}
export type RemoveIngredientAction = {type: typeof REMOVE_INGREDIENT, ingredientName:string}

export type ActionTypes = AddIngredientAction | RemoveIngredientAction ;