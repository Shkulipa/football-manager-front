import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom/client';
import Provider from 'react-redux/es/components/Provider';
import { App } from 'src/components';

import { store } from './store/store';

import 'src/assets/styles/fonts/fonts.scss';
import 'src/assets/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<DndProvider backend={HTML5Backend}>
			<App />
		</DndProvider>
	</Provider>
);
