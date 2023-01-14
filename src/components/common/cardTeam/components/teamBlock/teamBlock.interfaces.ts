import { IHandlersSlider, ITeam } from 'src/interfaces';

export interface ITeamBlockProps extends IHandlersSlider {
	team?: ITeam;
	isDisabled?: boolean;
	skillteam: number;
}
