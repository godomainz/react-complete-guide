import { Ingredients } from "../ingredients";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENT_FAILED";

export const PURCHASE_BURGER_START = "PURCHASE_BURGER_START";
export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS";
export const PURCHASE_BURGER_FAIL = "PURCHASE_BURGER_FAIL";
export const PURCHASE_INIT = "PURCHASE_BURGER_INIT";

export const FETCH_ORDERS_START = "FETCH_ORDERS_START";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAIL = "FETCH_ORDERS_FAIL";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";

export type AddIngredientAction = {type: typeof ADD_INGREDIENT, ingredientName:string};
export type RemoveIngredientAction = {type: typeof REMOVE_INGREDIENT, ingredientName:string};
export type SetIngredientsAction = {type: typeof SET_INGREDIENTS, ingredients:Ingredients};
export type FetchIngredientsFailedAction = {type: typeof FETCH_INGREDIENTS_FAILED};

export type PurchaseBurgerStartAction = {type: typeof PURCHASE_BURGER_START}
export type PurchaseBurgerSuccessAction = {type: typeof PURCHASE_BURGER_SUCCESS, orderID:number, orderData:any}
export type PurchaseBurgerFailAction = {type: typeof PURCHASE_BURGER_FAIL, error:string}
export type PurchaseInitAction = {type: typeof PURCHASE_INIT}

export type FetchOrdersStartAction = {type: typeof FETCH_ORDERS_START}
export type FetchOrdersSuccessAction = {type: typeof FETCH_ORDERS_SUCCESS, orders:any}
export type FetchOrdersFailAction = {type: typeof FETCH_ORDERS_FAIL, error:string}

export type AuthStartAction = {type: typeof AUTH_START}
export type AuthSuccessAction = {type: typeof AUTH_SUCCESS, idToken:string, userId: string, error: any, loading:boolean}
export type AuthFailAction = {type: typeof AUTH_FAIL, error:string}
export type AuthLogoutAction = {type: typeof AUTH_LOGOUT}

export type SetAuthRedirectPathAction = {type: typeof SET_AUTH_REDIRECT_PATH, path: string}

export type ActionTypes = AddIngredientAction | RemoveIngredientAction | SetIngredientsAction | FetchIngredientsFailedAction | 
                            PurchaseBurgerStartAction | PurchaseBurgerSuccessAction | PurchaseBurgerFailAction | PurchaseInitAction | FetchOrdersStartAction |
                            FetchOrdersSuccessAction | FetchOrdersFailAction| AuthStartAction | AuthSuccessAction | AuthFailAction | AuthLogoutAction |
                            SetAuthRedirectPathAction ;