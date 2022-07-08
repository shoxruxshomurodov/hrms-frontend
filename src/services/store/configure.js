import {createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import reducers from './reducers'
import { persistStore } from 'redux-persist';
import {apply, afterCreate} from "./middlewares";

export default function configureStore() {
    const store = afterCreate(createStore(reducers, composeWithDevTools(apply)));
    const persistor = persistStore(store);
    return {store,persistor};
}
