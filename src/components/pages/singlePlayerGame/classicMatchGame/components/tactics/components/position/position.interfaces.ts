import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IPositionProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	position: any;
}
