import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IPlayerInTableProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	currentPlayer: any;
}
