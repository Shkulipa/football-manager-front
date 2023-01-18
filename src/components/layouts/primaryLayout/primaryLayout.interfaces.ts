import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IPrimaryLayoutProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
