import {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	PropsWithChildren
} from 'react';

export interface IButtonIconProps
	extends PropsWithChildren<
		DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>
	> {}
