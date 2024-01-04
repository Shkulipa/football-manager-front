import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface ICenterContainerProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
