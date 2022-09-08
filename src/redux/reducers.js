import { combineReducers } from "redux";
import userReducer from "./data/userReducer";
import {persistReducer} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import lineItemReducer from "./data/lineItemReducer";
import cartViewReducer from "./data/cartViewReducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['nonPersistantReducer']
}

const nonPersistantReducer = combineReducers({
    lineItemReducer,
    cartViewReducer: cartViewReducer
})

const persistantReducer = persistReducer(persistConfig, userReducer);

export const rootReducer = combineReducers({persistantReducer: persistantReducer, nonPersistantReducer: nonPersistantReducer});
