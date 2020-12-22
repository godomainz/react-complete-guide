import * as actionTypes from "./actions";
import IngredientState from "./ingredientState";

const initialState: IngredientState = {
    ingredients: {
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice: 4
}

const reducer = (state:IngredientState=initialState, action:actionTypes.ActionTypes) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
           return {
               ...state,
               ingredients: {
                   ...state.ingredients,
                   [action.ingredientName]: state.ingredients[action.ingredientName] + 1
               }
           };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            };
        default:
            return state
    }
}

export default reducer;