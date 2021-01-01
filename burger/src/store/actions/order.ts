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
                dispatch(purchaseBurgerSuccess(response.data.name,orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error.toString()));
            });
    }
};

export const purchaseInit = ():actionTypes.PurchaseInitAction => ({
    type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = (orders:any):actionTypes.FetchOrdersSuccessAction => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
});

export const fetchOrdersFail = (error:string):actionTypes.FetchOrdersFailAction => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
});

export const fetchOrdersStart = ():actionTypes.FetchOrdersStartAction => ({
    type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => {
    return (dispatch:(func:any)=>void) => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json').then(res => {
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({id:key, ...res.data[key]})
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(err => {
            dispatch(fetchOrdersFail(err.toString()));
        });
       
    }
};