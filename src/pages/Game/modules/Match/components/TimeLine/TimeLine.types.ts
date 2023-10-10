import { IUseSimulateSingleMatchRes } from '@/pages/Game/hooks/useSimulateSingleMatch';

export interface ITimeLineProps
	extends Pick<
		IUseSimulateSingleMatchRes,
		'isPlay' | 'time' | 'currentIteration'
	> {}
