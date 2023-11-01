import { ICommonBasePropsWithChildren } from '@/types/others/commonProps';

export interface IPlayerTableProps extends ICommonBasePropsWithChildren {
	isAvailable?: boolean;
	isOver?: boolean;
}
