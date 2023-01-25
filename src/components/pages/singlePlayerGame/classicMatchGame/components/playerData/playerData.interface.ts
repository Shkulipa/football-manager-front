import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IPlayerDataProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	player: any;
}
