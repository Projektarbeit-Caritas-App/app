import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {persistedReducer, rootReducer} from "./reducers";
import {persistStore} from "redux-persist";

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
