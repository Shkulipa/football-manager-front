import { IRealPlayer } from '@/types/football-simulator/real-player';
import { EPlayerPositionName } from 'footballsimulationengine';

export type TPositionTacticPositionsRealTeam = Partial<
	Record<EPlayerPositionName, IRealPlayer>
>;

export interface IFootballTacticFieldRealTeamProps {
	positions: TPositionTacticPositionsRealTeam;
}
