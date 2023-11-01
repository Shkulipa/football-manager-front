import {
	DetailedHTMLProps,
	ButtonHTMLAttributes,
	PropsWithChildren
} from 'react';

type BtnType = 'primary' | 'secondary';

export interface IButtonProps
	extends PropsWithChildren<
		DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>
	> {
	isLoading?: boolean;
	appearance?: BtnType;
}
