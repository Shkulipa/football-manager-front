import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IErrorMsg
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
