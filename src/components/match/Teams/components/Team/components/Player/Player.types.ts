import { IPlayer } from 'footballsimulationengine';
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface IPlayerProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	player: IPlayer;
}
