import { IHandlersSlider, ILeague } from 'src/interfaces';

export interface ILeagueBlockProps extends IHandlersSlider {
	league?: ILeague;
	isDisabled: boolean;
}
