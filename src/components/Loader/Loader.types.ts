import { TSize } from '@/types/size.types';
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface ILoaderProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	size?: TSize;
}
