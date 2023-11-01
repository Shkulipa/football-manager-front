import { IUseSimulateSingleMatchRes } from '@/layouts/pages/game/hooks/useSimulateSingleMatch';

export interface ITimeLineProps
	extends Pick<
		IUseSimulateSingleMatchRes,
		'isPlay' | 'time' | 'currentIteration'
	> {}
