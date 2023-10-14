import { EPlayerPositionName } from '@/constants/player-position-name.enum';
import { playerPositionsFirstTeam } from '@/constants/player-positions';
import {
	IRealPlayerNotMain,
	TSquadRealTeam
} from '@/types/real-team-full-info';

export const parsePlayersMainHelper = (squad: TSquadRealTeam) => {
	const parsedPlayers = [];

	for (const [key, val] of Object.entries(squad)) {
		const skillParse: Record<string, string | number> = { ...val.skills };
		for (const skill in skillParse) {
			skillParse[skill] = String(skillParse[skill]);
		}

		const player = {
			...val,
			position: key,
			currentPOS: playerPositionsFirstTeam[key as EPlayerPositionName],
			fitness: 100,
			injured: false,
			skill: skillParse
		};

		parsedPlayers.push(player);
	}
	return parsedPlayers;
};

export const parsePlayersNotMainHelper = (squad: IRealPlayerNotMain[]) => {
	const parsedPlayers = [];

	for (const p of squad) {
		const skillParse: Record<string, string | number> = { ...p.skills };
		for (const skill in skillParse) {
			skillParse[skill] = String(skillParse[skill]);
		}

		const player = {
			...p,
			fitness: 100,
			injured: false,
			skill: skillParse
		};

		parsedPlayers.push(player);
	}
	return parsedPlayers;
};
