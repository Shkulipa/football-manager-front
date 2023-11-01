import { IUseSimulateSingleMatchRes } from '@/layouts/pages/game/hooks/useSimulateSingleMatch';

export interface ISpeedProps
	extends Pick<
		IUseSimulateSingleMatchRes,
		'speedDown' | 'speedUp' | 'speed' | 'isOverMatch'
	> {}
