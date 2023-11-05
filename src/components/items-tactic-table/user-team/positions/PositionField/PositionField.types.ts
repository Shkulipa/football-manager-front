import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import { IPosition } from '../../types/position-user-team';

export interface IPositionFieldProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	position: IPosition;
}
