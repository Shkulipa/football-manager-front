import { skillGoalkeeper, skillMidfielder } from 'src/utils';

export const skillPlayer = (player: any) => {
	let skillAvrg;
	if (player.position === 'GK') skillAvrg = skillGoalkeeper(player);
	else skillAvrg = skillMidfielder(player);

	return parseInt(skillAvrg);
};
