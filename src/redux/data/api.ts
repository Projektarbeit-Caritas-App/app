import axios from "axios";
import {initialUserData} from "./userMock";
import {useDispatch, useSelector} from "react-redux";
import {AnyAction} from "redux";
import {Dispatch} from "react";

const BASE_URL = "https://caritas.wolfshoehle.eu/"

export const POST_LOGIN = BASE_URL + 'api/auth/token';
export const GET_USER = BASE_URL + 'api/admin/user/';
export const GET_LIMITATIONS = BASE_URL + 'api/admin/limitation/limits/';
export const GET_LIMITATION_SETS = BASE_URL + 'api/admin/limitation/sets';
const GET_CARD = BASE_URL + 'api/card/visit/';

//todo: Catch 401 and logout user

export const getCardByID = (id: number, config: object) => {
    return new Promise((resolve, reject) => {
        axios.get(GET_CARD + id, config).then((response) => {
            resolve(response);
        }).catch(reject);
    })
}

export const loginUser = (email: string, password: string, dispatch: Dispatch<AnyAction>) => {
    return new Promise((resolve, reject) => {
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
            resolve(true);
        }).catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                resolve('Ungültige Zugangsdaten, bitte versuchen Sie es erneut.');
            } else {
                reject('Unbekannter Fehler (' + err.response.status + '). Bitte versuchen Sie es erneut oder melden Sie dies einem Administrator.')
            }
        });
    })
}
