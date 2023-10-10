import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IPtagProps
	extends PropsWithChildren<
		DetailedHTMLProps<
			HTMLAttributes<HTMLParagraphElement>,
			HTMLParagraphElement
		>
	> {
	size: 'l' | 'm' | 's';
}
