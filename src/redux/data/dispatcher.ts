import {Dispatch} from "react";
import {AnyAction} from "redux";
import {LineItem, CartView} from "./models";

export const dispatchSetUserData = (dispatch: Dispatch<AnyAction>, user: any, token: string) => {
    dispatch({
        type: "SET_USER_DATA",
        payload: user,
        token: token
    })
}

export const dispatchClearUserData = (dispatch: Dispatch<AnyAction>) => {
    dispatch({
        type: "CLEAR_USER_DATA"
    })
    dispatchClearLineItems(dispatch);
}

export const dispatchSetLineItems = (dispatch: Dispatch<AnyAction>, lineItems: LineItem[] | []) => {
    dispatch({
        type: "SET_LINE_ITEM",
        data: lineItems
    })
}

export const dispatchClearLineItems = (dispatch: Dispatch<AnyAction>) => {
    dispatch({
        type: "CLEAR_LINE_ITEMS"
    })
}


export const dispatchCartView = (dispatch: Dispatch<AnyAction>, cartView: CartView | []) => {
    dispatch({
        type: "SET_CART_VIEW",
        data: cartView
    })
}

export const dispatchClearCartView = (dispatch: Dispatch<AnyAction>) => {
    dispatch({
        type: "CLEAR_CART_VIEW"
    })
}
