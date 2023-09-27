'use client';

import { PropsWithChildren } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Provider } from 'react-redux';

interface IReduxProvider extends PropsWithChildren {}

export default function ReduxProvider({ children }: IReduxProvider) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				{children}
			</PersistGate>
		</Provider>
	);
}
