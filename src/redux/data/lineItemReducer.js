export default function lineItemReducer(lineItemState, action) {
    if(lineItemState === undefined)
    {
        lineItemState = [];
    }
    switch (action.type) {
        case "SET_LINE_ITEM": {
            return action.data;
        }
        case "CLEAR_LINE_ITEMS": {
            return [];
        }
        default:
            return lineItemState
    }
}
