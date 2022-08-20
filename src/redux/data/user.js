import {initialUserState} from "./userMock";

export function clearUserData() {
    return {
        type: "CLEAR_USER_DATA"
    }
}

export default function userReducer(userState = initialUserState, action) {
    switch (action.type) {
        case "SET_USER_DATA": {
            return {
                ...userState,
                token: action.token,
                user: action.payload
            };
        }
        case "CLEAR_USER_DATA": {
            return {
                ...userState,
                token: '',
                user: null
            };
        }
        default:
            return userState
    }
}
