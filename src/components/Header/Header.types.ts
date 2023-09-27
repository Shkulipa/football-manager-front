import { DetailedHTMLProps, PropsWithChildren, HTMLAttributes } from 'react';

export interface IHeaderProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
