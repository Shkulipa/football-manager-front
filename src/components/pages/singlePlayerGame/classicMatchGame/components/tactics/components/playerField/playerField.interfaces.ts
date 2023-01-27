import { Dispatch } from 'react';

export interface IPlayerFieldProps {
	currentPlayer: any;
	setPositions: Dispatch<React.SetStateAction<any>>;
}
