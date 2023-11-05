import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';
import { IPlayerSkills } from '@/types/football-simulator/player-skills';
import { TPlayerPositionMain } from './group-players-by-position-in-main-squad';

export const averageSkillsPlayersFromMainSquad = (
	players: TPlayerPositionMain[]
) => {
	const averageVal =
		players.reduce((sumSkills, p) => {
			const skills: Partial<IPlayerSkills> = { ...p[1].skills };

			if (p[0] !== EPlayerPositionName.GK) {
				delete skills.penalty_taking;
				delete skills.saving;
			}

			const skillsValues = Object.values(p[1].skills);
			const countSkillPlayer =
				skillsValues.reduce((s, v) => s + v, 0) / skillsValues.length;
			return sumSkills + countSkillPlayer;
		}, 0) / players.length;

	return +Math.round(averageVal).toFixed(0) || 0;
};
