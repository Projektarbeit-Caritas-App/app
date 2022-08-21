import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
    console.log('store.getState()', store.getState());
    const userReducer = store.getState().userReducer;
    localStorage.setItem('userReducer', JSON.stringify(userReducer));
})

export default store;
