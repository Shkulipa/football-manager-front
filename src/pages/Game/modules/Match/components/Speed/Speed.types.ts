import { IUseSimulateSingleMatchRes } from '@/pages/Game/hooks/useSimulateSingleMatch';

export interface ISpeedProps
	extends Pick<
		IUseSimulateSingleMatchRes,
		'speedDown' | 'speedUp' | 'speed' | 'isOverMatch'
	> {}
