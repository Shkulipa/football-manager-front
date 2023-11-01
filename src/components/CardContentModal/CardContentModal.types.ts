import { ICommonBasePropsWithChildren } from '@/types/others/commonProps';

export interface ICardContentModalProps extends ICommonBasePropsWithChildren {
	title?: string;
	description: string;
	callbackClose?: () => void;
	isShowCloseButton?: boolean;
}
