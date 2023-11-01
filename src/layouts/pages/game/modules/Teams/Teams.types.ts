import { IUseSimulateSingleMatchRes } from '../../hooks/useSimulateSingleMatch';

export interface ITeamsProps
	extends Pick<IUseSimulateSingleMatchRes, 'matchDetails'> {}
