import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';
import { positions } from '@/constants/zone-positons';
import { IRealPlayer } from '@/types/football-simulator/real-player';
import { TSquadMain } from '@/types/football-simulator/user-team';
import { averageSkillsPlayersFromMainSquad } from './average-skills-players-from-main-squad';

export type TPlayerPositionMain = [EPlayerPositionName, IRealPlayer];

export const groupPlayersByPositionInMainSquad = (mainSquad: TSquadMain) => {
	const main = Object.entries(mainSquad);

	const squad: Record<string, TPlayerPositionMain[]> = {
		attackers: [],
		midfielders: [],
		defenders: []
	};

	main.forEach(([position, player]) => {
		const pos = position as EPlayerPositionName;
		if (positions.attackers.includes(pos)) {
			squad.attackers.push([pos, player]);
		}
		if (positions.midfielders.includes(pos)) {
			squad.midfielders.push([pos, player]);
		}
		if (positions.defenders.includes(pos)) {
			squad.defenders.push([pos, player]);
		}
	});

	const att = averageSkillsPlayersFromMainSquad(squad.attackers);
	const mid = averageSkillsPlayersFromMainSquad(squad.midfielders);
	const def = averageSkillsPlayersFromMainSquad(squad.defenders);

	return {
		att,
		mid,
		def
	};
};
