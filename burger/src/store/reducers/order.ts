import * as actionTypes from "../actions/actionTypes";
import OrderState from "../orderState";
import { updateObject } from "../../shared/utility";

const initialState:OrderState = {
    orders:[],
    loading: false,
    purchased: false
}

const purchaseInit = (state:OrderState, action:actionTypes.PurchaseInitAction) => {
    return updateObject(state, { purchased: false });
}

const purchaseBurgerStart = (state:OrderState, action:actionTypes.PurchaseBurgerStartAction) => {
    return updateObject(state, { loading: true });
}

const purchaseBurgerSuccess = (state:OrderState, action:actionTypes.PurchaseBurgerSuccessAction) => {
    const newOrder = updateObject(action.orderData, { id: action.orderID });
            return updateObject(state, 
                    { 
                        loading: false,
                        purchased: true,
                        orders: state.orders.concat(newOrder) 
                    }
                );
}

const purchaseBurgerFail = (state:OrderState, action:actionTypes.PurchaseBurgerFailAction) => {
    return updateObject(state,{ loading: false });
}

const fetchorderStart = (state:OrderState, action:actionTypes.FetchOrdersStartAction) => {
    return updateObject(state,{ loading: true });
}

const fetchordersSuccess = (state:OrderState, action:actionTypes.FetchOrdersSuccessAction) => {
    return updateObject(state, {
            orders: action.orders,
            loading: false
        }
    )
}

const fetchordersFail = (state:OrderState, action:actionTypes.FetchOrdersFailAction) => {
    return updateObject(state,{ loading: false });
}

const reducer = (state:OrderState=initialState, action:actionTypes.ActionTypes) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchorderStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchordersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchordersFail(state, action);
        default: return state;
    }
}

export default reducer;