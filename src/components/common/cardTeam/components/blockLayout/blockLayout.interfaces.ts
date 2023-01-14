import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IBlockLayoutProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
