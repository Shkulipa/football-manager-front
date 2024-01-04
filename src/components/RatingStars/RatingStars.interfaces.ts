import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IRatingStarsProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	rating: number;
	size?: number;
}
