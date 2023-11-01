import { IUseSimulateSingleMatchRes } from '../../hooks/useSimulateSingleMatch';

export interface IOptionsProps
	extends Pick<
		IUseSimulateSingleMatchRes,
		'optionsMatch' | 'optionsMatchHandler'
	> {}
