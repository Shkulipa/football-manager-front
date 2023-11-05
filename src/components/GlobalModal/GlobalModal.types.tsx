import { PropsWithChildren } from 'react';

export interface IGlobalModalProps extends PropsWithChildren {
	isShow: boolean;
	callbackClose: () => void;
}
