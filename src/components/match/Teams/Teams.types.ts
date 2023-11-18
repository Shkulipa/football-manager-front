import { IUseSimulateSingleMatchRes } from '@/modules/pages/game/hooks/useSimulateSingleMatch';

export interface ITeamsProps
	extends Pick<IUseSimulateSingleMatchRes, 'matchDetails'> {}
