import { IPlayer } from '@/types/football-simulator-engine/player.interface';
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IPlayerProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	player: IPlayer;
}
