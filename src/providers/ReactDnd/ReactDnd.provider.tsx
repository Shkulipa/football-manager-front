'use client';

import { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface IReactDndProvider extends PropsWithChildren {}

export default function ReactDndProvider({ children }: IReactDndProvider) {
	return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
