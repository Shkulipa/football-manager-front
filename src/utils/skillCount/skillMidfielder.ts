export const skillMidfielder = (player: any) => {
	const { passing, shooting, agility, strength, jumping, tackling } =
		player.skill;
	const totalSkill =
		parseInt(passing) +
		parseInt(agility) +
		parseInt(strength) +
		parseInt(shooting) +
		parseInt(tackling) +
		parseInt(jumping);
	const avrgSkill = (totalSkill / 6).toFixed();
	return avrgSkill;
};
