import { IRealPlayer } from '@/types/football-simulator/real-player';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPlayerMainTableUserTeamProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	player: IRealPlayer;
}
