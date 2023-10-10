import { EPlayerPositionName } from './player-position-name.enum';

type TPlayerPositions = {
	[key in EPlayerPositionName]: [number, number];
};

// for Kick off Team in Engine
export const playerPositionsFirstTeam: TPlayerPositions = {
	// offensive
	[EPlayerPositionName.LCF]: [455, 435],
	[EPlayerPositionName.ST]: [325, 435],
	[EPlayerPositionName.RCF]: [195, 435],

	// midfield
	[EPlayerPositionName.LWM]: [585, 350],
	[EPlayerPositionName.AML]: [455, 350],
	[EPlayerPositionName.AMC]: [325, 350],
	[EPlayerPositionName.AMR]: [195, 350],
	[EPlayerPositionName.RWM]: [65, 350],

	[EPlayerPositionName.LM]: [585, 265],
	[EPlayerPositionName.LCM]: [455, 265],
	[EPlayerPositionName.CM]: [325, 265],
	[EPlayerPositionName.RCM]: [195, 265],
	[EPlayerPositionName.RM]: [65, 265],

	// defensive
	[EPlayerPositionName.LWB]: [585, 165],
	[EPlayerPositionName.LDM]: [455, 165],
	[EPlayerPositionName.CDM]: [325, 165],
	[EPlayerPositionName.RDM]: [195, 165],
	[EPlayerPositionName.RWB]: [65, 165],

	[EPlayerPositionName.LB]: [585, 85],
	[EPlayerPositionName.LCB]: [455, 85],
	[EPlayerPositionName.CB]: [325, 85],
	[EPlayerPositionName.RCB]: [195, 85],
	[EPlayerPositionName.RB]: [65, 85],

	// GK
	[EPlayerPositionName.GK]: [325, 15]
};

// parse by playerPositions for Second Team in engine
export const playerPositionsSecondTeam: TPlayerPositions = {
	// offensive
	[EPlayerPositionName.LCF]: [455, 615],
	[EPlayerPositionName.ST]: [325, 615],
	[EPlayerPositionName.RCF]: [195, 615],

	// midfield
	[EPlayerPositionName.LWM]: [585, 700],
	[EPlayerPositionName.AML]: [455, 700],
	[EPlayerPositionName.AMC]: [325, 700],
	[EPlayerPositionName.AMR]: [195, 700],
	[EPlayerPositionName.RWM]: [65, 700],

	[EPlayerPositionName.LM]: [585, 785],
	[EPlayerPositionName.LCM]: [455, 785],
	[EPlayerPositionName.CM]: [325, 785],
	[EPlayerPositionName.RCM]: [195, 785],
	[EPlayerPositionName.RM]: [65, 785],

	// defensive
	[EPlayerPositionName.LWB]: [585, 885],
	[EPlayerPositionName.LDM]: [455, 885],
	[EPlayerPositionName.CDM]: [325, 885],
	[EPlayerPositionName.RDM]: [195, 885],
	[EPlayerPositionName.RWB]: [65, 885],

	[EPlayerPositionName.LB]: [585, 965],
	[EPlayerPositionName.LCB]: [455, 965],
	[EPlayerPositionName.CB]: [325, 965],
	[EPlayerPositionName.RCB]: [195, 965],
	[EPlayerPositionName.RB]: [65, 965],

	// GK
	[EPlayerPositionName.GK]: [325, 1035]
};
