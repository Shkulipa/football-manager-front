import { IBall } from './ball.interface';
import { ITeam } from './team.interface';
import { ITeamStatistics } from './team-statistics.interface';

export interface IMatchDetails {
	matchID: number;
	kickOffTeam: ITeam;
	secondTeam: ITeam;
	pitchSize: number[];
	ball: IBall;
	half: number;
	kickOffTeamStatistics: ITeamStatistics;
	secondTeamStatistics: ITeamStatistics;
	iterationLog: string[];
}
