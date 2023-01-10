import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Loader } from 'src/components';

export function Router(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={'/'}
					element={<Suspense fallback={<Loader />}>{<Home />}</Suspense>}
				/>
			</Routes>
		</BrowserRouter>
	);
}
