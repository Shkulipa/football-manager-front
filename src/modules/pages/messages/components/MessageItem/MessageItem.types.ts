import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IMessageOn } from '../../Messages.types';

export interface IMessageItemProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	message: IMessageOn;
	isMyMessage?: boolean;
}
