import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';
import { IPlayerSkills } from '@/types/football-simulator/player-skills';
import { IRealPlayer } from '@/types/football-simulator/real-player';

const averageSkillPlayerHelper = (players: IRealPlayer[]) => {
	const averageVal =
		players.reduce((sumSkills, p) => {
			const skills: Partial<IPlayerSkills> = { ...p.skills };

			if (!p.positions.includes(EPlayerPositionName.GK)) {
				delete skills.penalty_taking;
				delete skills.saving;
			}

			const skillsValues = Object.values(p.skills);
			const countSkillPlayer =
				skillsValues.reduce((s, v) => s + v, 0) / skillsValues.length;
			return sumSkills + countSkillPlayer;
		}, 0) / players.length;

	return +Math.round(averageVal).toFixed(0) || 0;
};

export default averageSkillPlayerHelper;
