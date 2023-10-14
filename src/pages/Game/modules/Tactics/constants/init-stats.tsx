import { IStats } from 'footballsimulationengine';

export const initStats: IStats = {
	cards: { yellow: 0, red: 0 },
	goals: 0,
	passes: { total: 0, on: 0, off: 0 },
	shots: { total: 0, on: 0, off: 0 },
	tackles: { total: 0, on: 0, off: 0, fouls: 0 }
};
