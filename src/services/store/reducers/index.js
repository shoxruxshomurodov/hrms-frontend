import { combineReducers } from "redux";
import normalizer from '../../../services/normalizer/reducers';
import authCheck from "../../auth/reducer";
import apiReducer from "../../api/reducer";
import hrms from "../../../modules/hrms/Reducers";
import auth from "../../../modules/auth/Reducers";
import storage from 'redux-persist/lib/storage'
import {persistReducer} from "redux-persist";

const rootReducer =  combineReducers({
    normalizer,
    authCheck,
    hrms,
    apiReducer,
    auth
});

const persistConfig = {
    key: 'storage',
    blacklist: ['normalizer','authCheck','apiReducer','auth'],
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

