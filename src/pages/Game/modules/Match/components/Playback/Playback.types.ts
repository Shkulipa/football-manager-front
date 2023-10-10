import { IUseSimulateSingleMatchRes } from '@/pages/Game/hooks/useSimulateSingleMatch';

export interface IPlaybackProps
	extends Pick<
		IUseSimulateSingleMatchRes,
		'isPlay' | 'handlerPlayback' | 'isOverMatch'
	> {}
