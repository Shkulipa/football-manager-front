import { EPlayerPositionName } from './footballsimulationengine/player-position-name.enum';

const attackers: EPlayerPositionName[] = [
	EPlayerPositionName.LCF,
	EPlayerPositionName.ST,
	EPlayerPositionName.RCF,
	EPlayerPositionName.LWM,
	EPlayerPositionName.AML,
	EPlayerPositionName.AMC,
	EPlayerPositionName.AMR,
	EPlayerPositionName.RWM
];

const midfielders: EPlayerPositionName[] = [
	EPlayerPositionName.LM,
	EPlayerPositionName.LCM,
	EPlayerPositionName.CM,
	EPlayerPositionName.RCM,
	EPlayerPositionName.RM
];

const defenders: EPlayerPositionName[] = [
	EPlayerPositionName.LWB,
	EPlayerPositionName.LDM,
	EPlayerPositionName.CDM,
	EPlayerPositionName.RDM,
	EPlayerPositionName.RWB,
	EPlayerPositionName.LB,
	EPlayerPositionName.LCB,
	EPlayerPositionName.CB,
	EPlayerPositionName.RCB,
	EPlayerPositionName.RB,
	EPlayerPositionName.GK
];

export const positions = {
	attackers,
	midfielders,
	defenders
};
