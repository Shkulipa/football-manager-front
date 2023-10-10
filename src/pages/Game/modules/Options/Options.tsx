import { Option } from './components';

import { IOptionsProps } from './Options.types';
import styles from './Options.module.scss';

export function Options({ optionsMatch, optionsMatchHandler }: IOptionsProps) {
	const {
		isShowNumber,
		isShowName,
		isShowCoordinates,
		isShowFitness,
		isShowChanged
	} = optionsMatch;

	return (
		<div className={styles.options}>
			<Option
				text="Show number of player?"
				isOption={isShowNumber}
				setOptionsMatch={() =>
					optionsMatchHandler({
						...optionsMatch,
						isShowNumber: !optionsMatch.isShowNumber
					})
				}
			/>
			<Option
				text="Show name of player?"
				isOption={isShowName}
				setOptionsMatch={() =>
					optionsMatchHandler({
						...optionsMatch,
						isShowName: !optionsMatch.isShowName
					})
				}
			/>
			<Option
				text="Show fitness of player?"
				isOption={isShowFitness}
				setOptionsMatch={() =>
					optionsMatchHandler({
						...optionsMatch,
						isShowFitness: !optionsMatch.isShowFitness
					})
				}
			/>
			<Option
				text="Show changed players ?"
				isOption={isShowChanged}
				setOptionsMatch={() =>
					optionsMatchHandler({
						...optionsMatch,
						isShowChanged: !optionsMatch.isShowChanged
					})
				}
			/>
			<Option
				text="Show coordinates of player?"
				isOption={isShowCoordinates}
				setOptionsMatch={() =>
					optionsMatchHandler({
						...optionsMatch,
						isShowCoordinates: !optionsMatch.isShowCoordinates
					})
				}
			/>
		</div>
	);
}
