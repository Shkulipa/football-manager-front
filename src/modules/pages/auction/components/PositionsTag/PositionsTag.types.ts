import { ButtonHTMLAttributes } from 'react';

export interface IPositionsTagProps
	extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
	positionName: string;
}
