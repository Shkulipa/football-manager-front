import { IRealPlayerNotMain } from 'footballsimulationengine';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPositionBenchTableProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	currentPlayer: IRealPlayerNotMain;
}
