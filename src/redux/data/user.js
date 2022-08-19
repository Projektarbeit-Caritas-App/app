import {initialUserData, initialUserState} from "./userMock";
import axios from "axios";
import {baseUrl} from "../config";

export function loginUser(email, password)
{
    return (dispatch, getState) => {
        /*fetch(`${baseUrl}/${number}`)
            .then(res => res.json())
            .then(res => {
                let tempUserData = initialUserData;
                tempUserData.email = email;
                dispatch({
                    type: "SET_USER_DATA",
                    payload: tempUserData
                })
            })*/

        axios({
            method: 'get',
            url: `${baseUrl}/api/handshake`,
        }).then((response) => {
            console.log("axios:");
            console.log(response);
            axios.defaults.withCredentials = true;
            axios.post(`${baseUrl}/api/auth/login`,
                {
                    email: email,
                    password: password
                }
            ).then((response) => {
                console.log("postAxios:");
                console.log(response);

            });
        });

        let tempUserData = initialUserData;
        tempUserData.email = email;
        dispatch({
            type: "SET_USER_DATA",
            payload: tempUserData
        })
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
                userState,
                loggedIn: true,
                user: action.payload
            };
        }
        case "CLEAR_USER_DATA": {
            return {
                userState,
                user: action.payload
            };
        }
        default: return userState
    }
}
