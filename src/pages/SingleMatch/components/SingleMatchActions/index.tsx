import { Btn } from '@/components';
import styles from './SingleMatchAction.module.scss';
import { ISingleMatchActionsProps } from './SingleMatchActions.types';

export function SingleMatchActions({
	hostsHandler,
	aiHandler,
	guestsHandler
}: ISingleMatchActionsProps): JSX.Element {
	return (
		<div className={styles.singleMatchActionContainer}>
			<Btn onClick={hostsHandler}>Play for Hosts</Btn>
			<Btn onClick={aiHandler}>AI vs AI</Btn>
			<Btn onClick={guestsHandler}>Play for Guests</Btn>
		</div>
	);
}
