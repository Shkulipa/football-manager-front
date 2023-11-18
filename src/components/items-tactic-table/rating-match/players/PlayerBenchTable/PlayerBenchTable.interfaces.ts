import { IRealPlayerNotMain } from 'footballsimulationengine';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPlayerBenchTableProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	player: IRealPlayerNotMain;
}
