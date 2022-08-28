import {Dispatch} from "react";
import {AnyAction} from "redux";
import {LineItem} from "./models";

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
