import { Ingredients } from "../ingredients";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENT_FAILED";

export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS";
export const PURCHASE_BURGER_FAIL = "PURCHASE_BURGER_FAIL";

export type AddIngredientAction = {type: typeof ADD_INGREDIENT, ingredientName:string};
export type RemoveIngredientAction = {type: typeof REMOVE_INGREDIENT, ingredientName:string};
export type SetIngredientsAction = {type: typeof SET_INGREDIENTS, ingredients:Ingredients};
export type FetchIngredientsFailedAction = {type: typeof FETCH_INGREDIENTS_FAILED};
export type PurchaseBurgerSuccessAction = {type: typeof PURCHASE_BURGER_SUCCESS, orderID:number, orderData:any}
export type PurchaseBurgerFailAction = {type: typeof PURCHASE_BURGER_FAIL,error:string}

export type ActionTypes = AddIngredientAction | RemoveIngredientAction | SetIngredientsAction | FetchIngredientsFailedAction | PurchaseBurgerSuccessAction | PurchaseBurgerFailAction;