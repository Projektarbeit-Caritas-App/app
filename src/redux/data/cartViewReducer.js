export default function cartViewReducer(cartView, action) {
    if(cartView === undefined)
    {
        cartView = [];
    }
    switch (action.type) {
        case "SET_CART_VIEW": {
            return action.data;
        }
        case "CLEAR_CART_VIEW": {
            return [];
        }
        default:
            return cartView
    }
}
