export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENT_FAILED";

export type AddIngredientAction = {type: typeof ADD_INGREDIENT, ingredientName:string}
export type RemoveIngredientAction = {type: typeof REMOVE_INGREDIENT, ingredientName:string}
export type SetIngredientsAction = {type: typeof SET_INGREDIENTS, ingredients:any}
export type FetchIngredientsFailedAction = {type: typeof FETCH_INGREDIENTS_FAILED}

export type ActionTypes = AddIngredientAction | RemoveIngredientAction | SetIngredientsAction | FetchIngredientsFailedAction;