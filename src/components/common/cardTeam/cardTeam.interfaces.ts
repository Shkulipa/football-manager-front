import { ITeam } from 'src/interfaces';

export interface ICardTeamProps {
	title: string;
	team?: ITeam;
	handlerTeam: (team: ITeam) => void;
}

export enum ESliderActions {
	NEXT = 'next',
	BACK = 'back'
}
