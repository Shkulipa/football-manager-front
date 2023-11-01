import { ICommonBasePropsWithChildren } from '@/types/others/commonProps';

type THeading = 'h1' | 'h2' | 'h3';
export interface IHtagProps extends ICommonBasePropsWithChildren {
	tag: THeading;
}
