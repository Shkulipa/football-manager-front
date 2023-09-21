import { TPropsChildren } from '@/types/props-children.type';

type BtnType = 'primary' | 'secondary';

export interface IBtn
	extends TPropsChildren {
	appearance?: BtnType;
}
