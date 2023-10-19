import { IDirection } from '@/types/direction.types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IIconProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		IDirection {
	width?: number;
	height?: number;
	fill?: string;
}
