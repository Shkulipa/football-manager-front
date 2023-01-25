import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface ITabMatchProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	leftText: string;
	middleText: string;
	rightText: string;
}
