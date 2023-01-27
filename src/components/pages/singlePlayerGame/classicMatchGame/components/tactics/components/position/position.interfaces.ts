import {
	DetailedHTMLProps,
	Dispatch,
	HTMLAttributes,
	PropsWithChildren
} from 'react';

export interface IPositionProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	player: any;
	setPositions: Dispatch<React.SetStateAction<any>>;
}
