export const skillGoalkeeper = (player: any) => {
	const { passing, saving, agility, strength, jumping, penalty_taking } =
		player.skill;
	const totalSkill =
		parseInt(passing) +
		parseInt(saving) +
		parseInt(agility) +
		parseInt(strength) +
		parseInt(penalty_taking) +
		parseInt(jumping);
	const avrgSkill = (totalSkill / 6).toFixed();
	return avrgSkill;
};
