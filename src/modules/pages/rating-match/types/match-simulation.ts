import { IMatchDetails } from 'footballsimulationengine';

export interface IMatchSimulationData {
	currIteration: number;
	gameLength: number;
	simulations: IMatchDetails[];
}
