import { randomIntFromInterval } from '@/utils/random-int-from-interval.helper';
import { IUseInitTeamProps } from './initTeam.types';

export function initTeam({ currTeam, teams }: IUseInitTeamProps) {
	if (!currTeam) {
		const randomCountry = randomIntFromInterval(0, teams.length - 1);

		const randomLeague = randomIntFromInterval(
			0,
			teams[randomCountry].leagues.length - 1
		);
		const randomTeam = randomIntFromInterval(
			0,
			teams[randomCountry].leagues[randomLeague].teams.length - 1
		);

		return {
			initCountry: randomCountry,
			initLeague: randomLeague,
			initTeam: randomTeam
		};
	}

	const initCountry =
		currTeam &&
		teams.findIndex(c =>
			c.leagues.find(l => l.teams.find(t => t._id === currTeam._id))
		);
	const initLeague =
		currTeam &&
		teams[initCountry].leagues.findIndex(l =>
			l.teams.find(t => t._id === currTeam._id)
		);
	const initTeam =
		currTeam &&
		teams[initCountry].leagues[initLeague].teams.findIndex(
			t => t._id === currTeam._id
		);

	return { initCountry, initLeague, initTeam };
}
