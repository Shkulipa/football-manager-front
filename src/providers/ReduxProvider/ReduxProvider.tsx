'use client';

import { PropsWithChildren } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store/store';

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
