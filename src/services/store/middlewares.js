import createSagaMiddleware from 'redux-saga';
import {applyMiddleware} from 'redux'
import sagas from "./sagas"
import ReduxPromise from "redux-promise";
import axios from "axios";
import storage from "../storage";
import get from "lodash/get";

const sagaMiddleware = createSagaMiddleware();
const list = [
    sagaMiddleware,
    ReduxPromise
];
const apply = applyMiddleware(...list);
const afterCreate = (store) => {
    sagaMiddleware.run(sagas);
    store.subscribe(() => {
        let state = store.getState();
        let tokenStorage = storage.get("token");
        let tokenState = storage.get("token");
        if (get(state, 'auth.token', false)) {
            axios.defaults.headers["Authorization"] = `Bearer ${tokenState}`;
            storage.set("token",get(state,"auth.token"));
        } else if (tokenStorage) {
            axios.defaults.headers["Authorization"] = `Bearer ${tokenStorage}`;
        }else{
            axios.defaults.headers.common['Authorization'] = '';
        }


    });
    return store;
}

export {apply, afterCreate, list};
