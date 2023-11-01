import { EPlayerPositionName } from 'footballsimulationengine';
import { IRealPlayer } from './real-player';

export type TSquadId = Record<EPlayerPositionName, string>;
export type TSquadMain = Partial<Record<EPlayerPositionName, IRealPlayer>>;
