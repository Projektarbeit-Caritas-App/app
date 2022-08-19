import axios from "axios";
import {initialUserData} from "./userMock";
import {useSelector} from "react-redux";

const BASE_URL = "https://caritas.wolfshoehle.eu/"

export const POST_LOGIN = BASE_URL + 'api/auth/token';
export const GET_USER = BASE_URL + 'api/admin/user/';
export const GET_LIMITATIONS = BASE_URL + 'api/admin/limitation/limits/';
export const GET_LIMITATION_SETS = BASE_URL + 'api/admin/limitation/sets';
const GET_CARD = BASE_URL + 'api/card/visit/';

export const getCardByID = (id: number, config: object) => {
    return new Promise((resolve, reject) => {
        axios.get(GET_CARD, config).then((response) => {
            console.log("response:");
            console.log(response);
            resolve(response);
        }).catch(reject);
    })
}
