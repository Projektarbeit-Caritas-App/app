import { combineReducers } from "redux";
import userReducer from "./data/userReducer";
import {persistReducer} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}


export const rootReducer = combineReducers({
    userReducer
})


export const persistedReducer = persistReducer(persistConfig, rootReducer);
