import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import { IPosition } from '../../types/position-user-tema';

export interface IPositionFieldPrepareProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	position: IPosition;
}
