import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ClassicMatch, ClassicMatchGame, Home, Loader } from 'src/components';

export function Router(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={'/'}
					element={<Suspense fallback={<Loader />}>{<Home />}</Suspense>}
				/>
				<Route
					path={'/classic-match'}
					element={
						<Suspense fallback={<Loader />}>{<ClassicMatch />}</Suspense>
					}
				/>
				<Route
					path={'/classic-match-game'}
					element={
						<Suspense fallback={<Loader />}>
							<ClassicMatchGame />
						</Suspense>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
