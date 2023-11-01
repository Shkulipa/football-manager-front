import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import { IPosition } from '../../types/position-user-tema';

export interface IPositionMainTableUserTeamProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	position: IPosition;
}
