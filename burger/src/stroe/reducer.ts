import * as actionTypes from "./actions";
import IngredientState from "./ingredientState";

const initialState: IngredientState = {
    ingredients: null,
    totalPrice: 4
}

const reducer = (state:IngredientState=initialState, action:actionTypes.ActionTypes) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
           return state;
        case actionTypes.REMOVE_INGREDIENT:
            return state;
        default:
            return state
    }
}

export default reducer;