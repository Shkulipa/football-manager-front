import { ILot } from '@/api/rest/auction/types/lot';
import { ICommonBasePropsWithChildren } from '@/types/others/commonProps';

export interface ICardLotProps extends ICommonBasePropsWithChildren {
	lot: ILot;
}
