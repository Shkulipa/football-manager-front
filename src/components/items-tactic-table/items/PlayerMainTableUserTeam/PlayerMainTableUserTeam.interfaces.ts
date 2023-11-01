import { IRealPlayer } from '@/types/primary/real-player';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPlayerMainTableUserTeamProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	currentPlayer: IRealPlayer;
}
