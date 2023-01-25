import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface ITabProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	isActive: boolean;
}
