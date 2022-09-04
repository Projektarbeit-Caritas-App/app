export default function userReducer(userState, action) {
    if(userState === undefined)
    {
        userState = {
            token: '',
            user: null
        };
    }
    console.log('userState'); //todo: Debug entfernen
    console.log(userState); //todo: Debug entfernen
    switch (action.type) {
        case "SET_USER_DATA": {
            return {
                ...userState,
                token: action.token,
                user: action.payload,
                shop: null
            };
        }
        case "SET_SHOP": {
            return {
                ...userState,
                shop: action.data,
            };
        }
        case "CLEAR_USER_DATA": {
            return {
                ...userState,
                token: '',
                user: null,
                shop: null
            };
        }
        default:
            return userState
    }
}
