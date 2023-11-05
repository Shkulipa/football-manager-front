import { IPlayer } from 'footballsimulationengine';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPlayerMainTableProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	player: IPlayer;
}
