import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id:number, orderData:any):actionTypes.PurchaseBurgerSuccessAction => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderID: id,
    orderData: orderData
});

export const purchaseBurgerFail = (error:string):actionTypes.PurchaseBurgerFailAction => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
});

export const purchaseBurgerStart = ():actionTypes.PurchaseBurgerStartAction => ({
    type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = (orderData:any) => {
    return (dispatch:(func:any)=>void) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data,orderData));
                
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error.toString()));
            });
    }
};