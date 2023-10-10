import { IUseSimulateSingleMatchRes } from '../../hooks/useSimulateSingleMatch';

export interface IStatisticsProps
	extends Pick<IUseSimulateSingleMatchRes, 'matchDetails'> {}
