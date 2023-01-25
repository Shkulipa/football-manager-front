import { Dispatch } from 'react';
import { IOptionsMatch } from 'src/interfaces';

export interface IOptionsProps {
	optionsMatch: IOptionsMatch;
	setOptionsMatch: Dispatch<React.SetStateAction<IOptionsMatch>>;
}
