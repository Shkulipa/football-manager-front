import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IPaddingContainerProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
