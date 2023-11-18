import { IUseSimulateSingleMatchRes } from '@/modules/pages/game/hooks/useSimulateSingleMatch';

export interface IPlaybackProps
	extends Pick<
		IUseSimulateSingleMatchRes,
		'isPlay' | 'handlerPlayback' | 'isOverMatch'
	> {}
