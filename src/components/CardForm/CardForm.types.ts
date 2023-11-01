import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface ICardFormProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>
	> {}
