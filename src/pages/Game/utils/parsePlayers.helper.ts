import { EPlayerPositionName } from '@/constants/player-position-name.enum';
import { playerPositionsFirstTeam } from '@/constants/player-positions';
import { ERolePlayer } from '@/constants/rolePlayer.enum';
import { TSquadRealTeam } from '@/types/real-team-full-info';

export const parsePlayersHelper = (squad: TSquadRealTeam) => {
	const parsedPlayers = [];

	for (const [key, val] of Object.entries(squad)) {
		const skillParse: Record<string, string | number> = { ...val.skills };
		for (const skill in skillParse) {
			skillParse[skill] = String(skillParse[skill]);
		}

		const player = {
			...val,
			squadStart: ERolePlayer.MAIN,
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
