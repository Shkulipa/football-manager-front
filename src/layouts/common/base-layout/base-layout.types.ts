import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IBaseLayoutProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
