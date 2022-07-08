import React from 'react';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configure from './configure';
import Loader from "../../components/Loader";

const {store, persistor} = configure();

export default ({ children }) => {
	return <Provider store={store}>
		<PersistGate loading={<Loader />} persistor={persistor}>
			{children}
		</PersistGate></Provider>;
};
