import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface ISliderLayout
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}
