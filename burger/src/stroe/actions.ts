export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

export type AddIngredientAction = {type: typeof ADD_INGREDIENT}
export type RemoveIngredientAction = {type: typeof REMOVE_INGREDIENT}

export const addIngredient = (name:string,age:number):AddIngredientAction => ({
    type: ADD_INGREDIENT
});
export const removeIngredient = (name:string,age:number):RemoveIngredientAction => ({
    type: REMOVE_INGREDIENT
});

export type ActionTypes = AddIngredientAction | RemoveIngredientAction ;