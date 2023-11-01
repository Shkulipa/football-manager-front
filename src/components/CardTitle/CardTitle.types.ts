import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICardTitleProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	text: string;
}
