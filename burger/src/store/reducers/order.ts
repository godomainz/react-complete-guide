import * as actionTypes from "../actions/actionTypes";
import OrderState from "../orderState";

const initialState:OrderState = {
    orders:[],
    loading: false
}

const reducer = (state:OrderState=initialState, action:actionTypes.ActionTypes) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderID
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;