export interface IOptionsMatch {
	isShowNumber: boolean;
	isShowName: boolean;
	isShowFitness: boolean;
	isShowCoordinates: boolean;
	isShowChanged: boolean;
}

export interface IOptionsProps {
	optionsMatch: IOptionsMatch;
	optionsMatchHandler: (options: IOptionsMatch) => void;
}
