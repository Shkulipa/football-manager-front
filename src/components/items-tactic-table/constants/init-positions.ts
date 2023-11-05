import { TPositionTacticPositionsSingleMatch } from '@/components/football-tactic-fields/FootballTacticFieldSingleMatch/FootballTacticFieldSingleMatch.types';
import { TPositionTacticPositionsUserTeam } from '@/components/football-tactic-fields/FootballTacticFieldUserTeam/FootballTacticFieldUserTeam.types';
import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';
import {
	playerPositionsFirstTeam,
	playerPositionsSecondTeam
} from '@/constants/footballsimulationengine/player-positions';

export const initPositionsGUESTS:
	| TPositionTacticPositionsSingleMatch
	| TPositionTacticPositionsUserTeam = {
	[EPlayerPositionName.LCF]: {
		position: EPlayerPositionName.LCF,
		coordinates: playerPositionsFirstTeam.LCF,
		player: null
	},

	[EPlayerPositionName.ST]: {
		position: EPlayerPositionName.ST,
		coordinates: playerPositionsFirstTeam.ST,
		player: null
	},
	[EPlayerPositionName.RCF]: {
		position: EPlayerPositionName.RCF,
		coordinates: playerPositionsFirstTeam.RCF,
		player: null
	},

	/* attackers midfielders */
	[EPlayerPositionName.LWM]: {
		position: EPlayerPositionName.LWM,
		coordinates: playerPositionsFirstTeam.LWM,
		player: null
	},

	[EPlayerPositionName.AML]: {
		position: EPlayerPositionName.AML,
		coordinates: playerPositionsFirstTeam.AML,
		player: null
	},

	[EPlayerPositionName.AMC]: {
		position: EPlayerPositionName.AMC,
		coordinates: playerPositionsFirstTeam.AMC,
		player: null
	},

	[EPlayerPositionName.AMR]: {
		position: EPlayerPositionName.AMR,
		coordinates: playerPositionsFirstTeam.AMR,
		player: null
	},

	[EPlayerPositionName.RWM]: {
		position: EPlayerPositionName.RWM,
		coordinates: playerPositionsFirstTeam.RWM,
		player: null
	},

	/* midfielders */
	[EPlayerPositionName.LM]: {
		position: EPlayerPositionName.LM,
		coordinates: playerPositionsFirstTeam.LM,
		player: null
	},

	[EPlayerPositionName.LCM]: {
		position: EPlayerPositionName.LCM,
		coordinates: playerPositionsFirstTeam.LCM,
		player: null
	},

	[EPlayerPositionName.CM]: {
		position: EPlayerPositionName.CM,
		coordinates: playerPositionsFirstTeam.CM,
		player: null
	},

	[EPlayerPositionName.RCM]: {
		position: EPlayerPositionName.RCM,
		coordinates: playerPositionsFirstTeam.RCM,
		player: null
	},

	[EPlayerPositionName.RM]: {
		position: EPlayerPositionName.RM,
		coordinates: playerPositionsFirstTeam.RM,
		player: null
	},

	/* between midfielders & deffenders */
	[EPlayerPositionName.LWB]: {
		position: EPlayerPositionName.LWB,
		coordinates: playerPositionsFirstTeam.LWB,
		player: null
	},

	[EPlayerPositionName.LDM]: {
		position: EPlayerPositionName.LDM,
		coordinates: playerPositionsFirstTeam.LDM,
		player: null
	},

	[EPlayerPositionName.CDM]: {
		position: EPlayerPositionName.CDM,
		coordinates: playerPositionsFirstTeam.CDM,
		player: null
	},

	[EPlayerPositionName.RDM]: {
		position: EPlayerPositionName.RDM,
		coordinates: playerPositionsFirstTeam.RDM,
		player: null
	},

	[EPlayerPositionName.RWB]: {
		position: EPlayerPositionName.RWB,
		coordinates: playerPositionsFirstTeam.RWB,
		player: null
	},

	// defenders
	[EPlayerPositionName.LB]: {
		position: EPlayerPositionName.LB,
		coordinates: playerPositionsFirstTeam.LB,
		player: null
	},

	[EPlayerPositionName.LCB]: {
		position: EPlayerPositionName.LCB,
		coordinates: playerPositionsFirstTeam.LCB,
		player: null
	},

	[EPlayerPositionName.CB]: {
		position: EPlayerPositionName.CB,
		coordinates: playerPositionsFirstTeam.CB,
		player: null
	},

	[EPlayerPositionName.RCB]: {
		position: EPlayerPositionName.RCB,
		coordinates: playerPositionsFirstTeam.RCB,
		player: null
	},

	[EPlayerPositionName.RB]: {
		position: EPlayerPositionName.RB,
		coordinates: playerPositionsFirstTeam.RB,
		player: null
	},

	[EPlayerPositionName.GK]: {
		position: EPlayerPositionName.GK,
		coordinates: playerPositionsFirstTeam.GK,
		player: null
	}
};
export const initPositionsHOSTS = Object.fromEntries(
	Object.entries(initPositionsGUESTS).map(([key, value]) => [
		key,
		{
			...value,
			position: value.position,
			coordinates:
				playerPositionsSecondTeam[
					EPlayerPositionName[value.position as EPlayerPositionName]
				]
		}
	])
);

// make order in this priority: GK, RB, RCB and so on, how it is in initPositionsGUESTS from Down in Up
export const orderedPositions = Object.values(initPositionsGUESTS).map(
	pos => pos.position
);
