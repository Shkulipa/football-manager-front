import { IUseSimulateSingleMatchRes } from '../../hooks/useSimulateSingleMatch';

export interface IMatchProps
	extends Pick<
		IUseSimulateSingleMatchRes,
		| 'currentIteration'
		| 'isPlay'
		| 'speed'
		| 'time'
		| 'handlerPlayback'
		| 'matchDetails'
		| 'speedDown'
		| 'speedUp'
		| 'isOverMatch'
		| 'optionsMatch'
	> {}
