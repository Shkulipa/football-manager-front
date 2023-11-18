import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';
import { IReplacement } from 'footballsimulationengine';

export interface ISquadUpdateReq {
	main: Record<Partial<EPlayerPositionName>, string>;
	bench: string[];
	replacements: IReplacement[];
}
