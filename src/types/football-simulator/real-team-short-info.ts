import { IRealTeamFullInfo } from './real-team-full-info';

export interface IRealTeamShortInfo
	extends Pick<IRealTeamFullInfo, '_id' | 'logoClub' | 'clubName' | 'skills'> {}
