import axios from "axios";
import {AnyAction} from "redux";
import {Dispatch} from "react";
import {dispatchClearUserData, dispatchSetUserData} from "./dispatcher";

const BASE_URL = "https://caritas.wolfshoehle.eu/"

const POST_LOGIN = BASE_URL + 'api/auth/token';
const GET_CARD = BASE_URL + 'api/card/visit/';
const POST_CARD = BASE_URL + 'api/card/visit/';
const GET_SCHEDULE = BASE_URL + 'api/schedule/';

export const getCardByID = (id: number, config: object, dispatch: Dispatch<AnyAction>) => {
    return new Promise((resolve, reject) => {
        axios.get(GET_CARD + id, config).then((response) => {

            console.log('response'); //todo: Debug entfernen
            console.log(response); //todo: Debug entfernen
            resolve(prepareDataForCard(response));
        }).catch(r => {
            console.log('reject'); //todo: Debug entfernen
            console.log(r); //todo: Debug entfernen
            if (r.response.status === 401) {
                console.log('dispatchClearUserData'); //todo: Debug entfernen
                dispatchClearUserData(dispatch);
                resolve('Unauthorized');
            } else reject();
        });
    })
}

const prepareDataForCard = (res: any) => {
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
        } else {
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
            dispatchSetUserData(dispatch, response.data.user, response.data.token);
            resolve(true);
        }).catch(err => {
            if (err.response.status === 401) {
                resolve('Ungültige Zugangsdaten, bitte versuchen Sie es erneut.');
            } else {
                reject('Unbekannter Fehler (' + err.response.status + '). Bitte versuchen Sie es erneut oder melden Sie dies einem Administrator.')
            }
        });
    })
}

export const orderLineItems = (cardID: number, data: object, config: object, dispatch: Dispatch<AnyAction>) => {
    return new Promise((resolve, reject) => {
        axios.post(POST_CARD + cardID, data, config).then((response) => {
            resolve(true);
        }).catch(r => {
            if (r.response.status === 401) {
                dispatchClearUserData(dispatch);
                resolve('Unauthorized');
            } else reject();
        });
    })
}

export const setCardComment = (cardID: number, comment: string, config: object, dispatch: Dispatch<AnyAction>) => {
    return new Promise((resolve, reject) => {
        axios.post(POST_CARD + cardID, {comment: comment}, config).then((response) => {
            resolve(true);
        }).catch(r => {
            if (r.response.status === 401) {
                dispatchClearUserData(dispatch);
                resolve('Unauthorized');
            } else reject();
        });
    })
}

export const getShops = (config: object, dispatch: Dispatch<AnyAction>) => {
    return new Promise((resolve, reject) => {
        axios.get(GET_SCHEDULE, config).then((response) => {
            resolve(response.data);
        }).catch(r => {
            if (r.response.status === 401) {
                dispatchClearUserData(dispatch);
                resolve('Unauthorized');
            } else reject();
        });
    })
}

export const getReservationsForShop = (id: number, config: object, dispatch: Dispatch<AnyAction>) => {
    return new Promise((resolve, reject) => {
        axios.get(GET_SCHEDULE + id, config).then((response) => {
            resolve(response.data);
        }).catch(r => {
            if (r.response.status === 401) {
                dispatchClearUserData(dispatch);
                resolve('Unauthorized');
            } else reject();
        });
    })
}
