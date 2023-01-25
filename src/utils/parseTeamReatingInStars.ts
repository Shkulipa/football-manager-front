import { ISkill } from 'src/interfaces';

export const parseTeamReatingInStars = (skills: ISkill) => {
	const { att, def, mid } = skills;
	const avrgSKill = (Number(att) + Number(def) + Number(mid)) / 3;
	const valueStars = Number(((avrgSKill * 5) / 100).toFixed(1));
	return valueStars;
};
