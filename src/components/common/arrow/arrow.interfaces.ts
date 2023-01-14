import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IArrowProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement>
	> {}
