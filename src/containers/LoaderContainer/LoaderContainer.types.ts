import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface ILoaderContainerProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
