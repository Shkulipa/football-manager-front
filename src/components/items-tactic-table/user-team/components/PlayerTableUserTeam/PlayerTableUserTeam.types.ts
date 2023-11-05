import { ICommonBasePropsWithChildren } from '@/types/others/commonProps';

export interface IPlayerTableUserTeamProps
	extends ICommonBasePropsWithChildren {
	isAvailable?: boolean;
	isOver?: boolean;
}
