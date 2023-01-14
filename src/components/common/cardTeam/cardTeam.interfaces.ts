import { ITeam } from 'src/interfaces';

export interface ICardTeamProps {
	title: string;
	team?: ITeam;
	setTeam: React.Dispatch<React.SetStateAction<ITeam | undefined>>;
}

export enum ESliderActions {
	NEXT = 'next',
	BACK = 'back'
}
