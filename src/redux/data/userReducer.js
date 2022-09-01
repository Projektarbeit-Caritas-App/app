export default function userReducer(userState, action) {
    if(userState === undefined)
    {
        userState = null;
    }
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
