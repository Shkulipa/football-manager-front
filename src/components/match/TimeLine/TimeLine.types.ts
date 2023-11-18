import { IUseSimulateSingleMatchRes } from '@/modules/pages/game/hooks/useSimulateSingleMatch';

export interface ITimeLineProps
	extends Pick<
		IUseSimulateSingleMatchRes,
		'isPlay' | 'time' | 'currentIteration'
	> {
	gameLength: number;
}
