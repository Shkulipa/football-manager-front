import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface ICommonBasePropsWithChildren
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
