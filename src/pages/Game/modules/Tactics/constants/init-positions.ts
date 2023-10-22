import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';
import { IPosition } from '../types/position.types';
import {
	playerPositionsFirstTeam,
	playerPositionsSecondTeam
} from '@/constants/footballsimulationengine/player-positions';

export const initPositionsGUESTS: Record<EPlayerPositionName, IPosition> = {
	[EPlayerPositionName.LCF]: {
		position: EPlayerPositionName.LCF,
		coordinates: playerPositionsFirstTeam.LCF,
		currentPlayer: null
	},

	[EPlayerPositionName.ST]: {
		position: EPlayerPositionName.ST,
		coordinates: playerPositionsFirstTeam.ST,
		currentPlayer: null
	},
	[EPlayerPositionName.RCF]: {
		position: EPlayerPositionName.RCF,
		coordinates: playerPositionsFirstTeam.RCF,
		currentPlayer: null
	},

	/* attackers midfielders */
	[EPlayerPositionName.LWM]: {
		position: EPlayerPositionName.LWM,
		coordinates: playerPositionsFirstTeam.LWM,
		currentPlayer: null
	},

	[EPlayerPositionName.AML]: {
		position: EPlayerPositionName.AML,
		coordinates: playerPositionsFirstTeam.AML,
		currentPlayer: null
	},

	[EPlayerPositionName.AMC]: {
		position: EPlayerPositionName.AMC,
		coordinates: playerPositionsFirstTeam.AMC,
		currentPlayer: null
	},

	[EPlayerPositionName.AMR]: {
		position: EPlayerPositionName.AMR,
		coordinates: playerPositionsFirstTeam.AMR,
		currentPlayer: null
	},

	[EPlayerPositionName.RWM]: {
		position: EPlayerPositionName.RWM,
		coordinates: playerPositionsFirstTeam.RWM,
		currentPlayer: null
	},

	/* midfielders */
	[EPlayerPositionName.LM]: {
		position: EPlayerPositionName.LM,
		coordinates: playerPositionsFirstTeam.LM,
		currentPlayer: null
	},

	[EPlayerPositionName.LCM]: {
		position: EPlayerPositionName.LCM,
		coordinates: playerPositionsFirstTeam.LCM,
		currentPlayer: null
	},

	[EPlayerPositionName.CM]: {
		position: EPlayerPositionName.CM,
		coordinates: playerPositionsFirstTeam.CM,
		currentPlayer: null
	},

	[EPlayerPositionName.RCM]: {
		position: EPlayerPositionName.RCM,
		coordinates: playerPositionsFirstTeam.RCM,
		currentPlayer: null
	},

	[EPlayerPositionName.RM]: {
		position: EPlayerPositionName.RM,
		coordinates: playerPositionsFirstTeam.RM,
		currentPlayer: null
	},

	/* between midfielders & deffenders */
	[EPlayerPositionName.LWB]: {
		position: EPlayerPositionName.LWB,
		coordinates: playerPositionsFirstTeam.LWB,
		currentPlayer: null
	},

	[EPlayerPositionName.LDM]: {
		position: EPlayerPositionName.LDM,
		coordinates: playerPositionsFirstTeam.LDM,
		currentPlayer: null
	},

	[EPlayerPositionName.CDM]: {
		position: EPlayerPositionName.CDM,
		coordinates: playerPositionsFirstTeam.CDM,
		currentPlayer: null
	},

	[EPlayerPositionName.RDM]: {
		position: EPlayerPositionName.RDM,
		coordinates: playerPositionsFirstTeam.RDM,
		currentPlayer: null
	},

	[EPlayerPositionName.RWB]: {
		position: EPlayerPositionName.RWB,
		coordinates: playerPositionsFirstTeam.RWB,
		currentPlayer: null
	},

	// defenders
	[EPlayerPositionName.LB]: {
		position: EPlayerPositionName.LB,
		coordinates: playerPositionsFirstTeam.LB,
		currentPlayer: null
	},

	[EPlayerPositionName.LCB]: {
		position: EPlayerPositionName.LCB,
		coordinates: playerPositionsFirstTeam.LCB,
		currentPlayer: null
	},

	[EPlayerPositionName.CB]: {
		position: EPlayerPositionName.CB,
		coordinates: playerPositionsFirstTeam.CB,
		currentPlayer: null
	},

	[EPlayerPositionName.RCB]: {
		position: EPlayerPositionName.RCB,
		coordinates: playerPositionsFirstTeam.RCB,
		currentPlayer: null
	},

	[EPlayerPositionName.RB]: {
		position: EPlayerPositionName.RB,
		coordinates: playerPositionsFirstTeam.RB,
		currentPlayer: null
	},

	[EPlayerPositionName.GK]: {
		position: EPlayerPositionName.GK,
		coordinates: playerPositionsFirstTeam.GK,
		currentPlayer: null
	}
};
export const initPositionsHOSTS = Object.fromEntries(
	Object.entries(initPositionsGUESTS).map(([key, value]) => [
		key,
		{
			...value,
			position: value.position,
			coordinates:
				playerPositionsSecondTeam[EPlayerPositionName[value.position]]
		}
	])
);

// make order in this priority: GK, RB, RCB and so on, how it is in initPositionsGUESTS from Down in Up
export const orderedPositions = Object.values(initPositionsGUESTS).map(
	pos => pos.position
);
