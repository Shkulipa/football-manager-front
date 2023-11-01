import { IDirection } from '@/types/others/direction.types';
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IIconContainerProps
	extends PropsWithChildren<
			DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
		>,
		IDirection {}
