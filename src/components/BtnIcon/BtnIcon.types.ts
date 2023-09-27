import {
	DetailedHTMLProps,
	ButtonHTMLAttributes,
	PropsWithChildren
} from 'react';

export interface IBtnIcon
	extends PropsWithChildren<
		DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>
	> {}
