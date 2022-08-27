import axios from "axios";
import {AnyAction} from "redux";
import {Dispatch} from "react";

const BASE_URL = "https://caritas.wolfshoehle.eu/"

export const POST_LOGIN = BASE_URL + 'api/auth/token';
export const GET_USER = BASE_URL + 'api/admin/user/';
export const GET_LIMITATIONS = BASE_URL + 'api/admin/limitation/limits/';
export const GET_LIMITATION_SETS = BASE_URL + 'api/admin/limitation/sets';
const GET_CARD = BASE_URL + 'api/card/visit/';

//todo: Catch 401 and logout user

export const getCardByID = (id: number, config: object, dispatch: Dispatch<AnyAction>) => {
    return new Promise((resolve, reject) => {
        axios.get(GET_CARD + id, config).then((response) => {

            resolve(prepareDataForCard(response));
        }).catch(r => {
            if(r.response.status === 401) {
                dispatch({
                    type: "CLEAR_USER_DATA"
                })
                resolve('Unauthorized');
            }
            else reject();
        });
    })
}

const prepareDataForCard = (res: any) =>
{
    const card = res.data.card;
    let tempPerson: any = {id: 1, age: 1, gender: '', data: null};
    let personsToSet: any = [];

    res.data.persons.forEach((singlePerson: any) => {
        tempPerson = singlePerson;
        tempPerson.index = personsToSet.length;
        tempPerson.data = singlePerson.limitation_states;
        if (singlePerson.gender === 'female') {
            tempPerson.gender = "weiblich";
        } else if (singlePerson.gender === 'male') {
            tempPerson.gender = "männlich";
        }
        else{
            tempPerson.gender = singlePerson.gender;
        }
        personsToSet.push(tempPerson);
    })
    return {card: card, persons: personsToSet};
}

export const loginUser = (email: string, password: string, dispatch: Dispatch<AnyAction>) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;

        axios({
                method: 'post',
                responseType: 'json',
                url: POST_LOGIN,
                data: {
                    email: email,
                    password: password,
                    device_name: 'mobile'
                }
        }).then((response) => {
            console.log("postAxios:");
            console.log(response);
            dispatch({
                type: "SET_USER_DATA",
                payload: response.data.user,
                token: response.data.token
            })
            resolve(true);
        }).catch(err => {
            console.log(err);
            console.log(JSON.stringify(err));
            console.log(err.response.data);
            if (err.response.status === 401) {
                resolve('Ungültige Zugangsdaten, bitte versuchen Sie es erneut.');
            } else {
                reject('Unbekannter Fehler (' + err.response.status + '). Bitte versuchen Sie es erneut oder melden Sie dies einem Administrator.')
            }
        });
    })
}
