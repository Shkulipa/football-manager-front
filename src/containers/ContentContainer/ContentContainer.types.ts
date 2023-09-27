import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IContentContainerProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
