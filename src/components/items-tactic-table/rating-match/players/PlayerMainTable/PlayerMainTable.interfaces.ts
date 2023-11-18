import { IPlayer } from 'footballsimulationengine';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPlayerMainTableUserTeamProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	player: IPlayer;
}
