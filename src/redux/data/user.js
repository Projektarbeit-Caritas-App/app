import {initialUserData, initialUserState} from "./userMock";
import axios from "axios";
import {BASE_URL, POST_LOGIN} from "./api";

export function loginUser(email, password) {
    return (dispatch, getState) => {
        axios.defaults.withCredentials = true;

        axios.post(POST_LOGIN,
            {
                email: email,
                password: password,
                device_name: 'mobile'
            }
        ).then((response) => {
            console.log("postAxios:");
            console.log(response);

            let tempUserData = initialUserData;
            tempUserData.email = email;
            console.log(response.data.token); //todo: Debug entfernen
            dispatch({
                type: "SET_USER_DATA",
                payload: tempUserData,
                token: response.data.token
            })
        });
    }
}

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
