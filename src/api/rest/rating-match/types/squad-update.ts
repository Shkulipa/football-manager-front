import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';
import { IRealPlayerNotMain } from 'footballsimulationengine';

export interface ISquadUpdateReq {
	main: Record<Partial<EPlayerPositionName>, string>;
	bench: IRealPlayerNotMain[];
}
