import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IPositionInTableProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	position: any;
}
