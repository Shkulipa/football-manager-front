import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface ITitleProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
