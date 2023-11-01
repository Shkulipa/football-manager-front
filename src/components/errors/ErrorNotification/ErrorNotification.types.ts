import { PropsWithChildren, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IErrorNotificationProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	message: string;
}
