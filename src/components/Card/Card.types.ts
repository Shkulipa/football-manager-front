import { PropsWithChildren, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICardProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
