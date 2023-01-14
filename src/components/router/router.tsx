import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Career, ClassicMatch, Home, Loader } from 'src/components';

export function Router(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={'/'}
					element={<Suspense fallback={<Loader />}>{<Home />}</Suspense>}
				/>
				<Route
					path={'/career'}
					element={<Suspense fallback={<Loader />}>{<Career />}</Suspense>}
				/>
				<Route
					path={'/classic-match'}
					element={
						<Suspense fallback={<Loader />}>{<ClassicMatch />}</Suspense>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
