import { IPlayer } from '@/api/rest/inventory/types/open-pack';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPlayerCardProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	player: IPlayer;
}
