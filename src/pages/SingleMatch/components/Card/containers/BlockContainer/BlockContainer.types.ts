import { PropsWithChildren } from 'react';

export interface IBlockContainerProps extends PropsWithChildren {
	onPrevClick: () => void;
	onNextClick: () => void;
	isDisabledPrevBtn: boolean;
	isDisabledNextBtn: boolean;
}
