import { TSize } from '@/types/others/size.types';
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface ILoaderProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	size?: TSize;
}
