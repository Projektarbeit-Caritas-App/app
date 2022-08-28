import { combineReducers } from "redux";
import userReducer from "./data/userReducer";
import {persistReducer} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import lineItemReducer from "./data/lineItemReducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}


export const rootReducer = combineReducers({
    userReducer,
    lineItemReducer
})


export const persistedReducer = persistReducer(persistConfig, rootReducer);
