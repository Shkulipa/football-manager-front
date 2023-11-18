import { Button } from '@/components';
import styles from './SingleMatchAction.module.scss';
import { ISingleMatchActionsProps } from './SingleMatchActions.types';

export function SingleMatchActions({
	hostsHandler,
	aiHandler,
	guestsHandler
}: ISingleMatchActionsProps): JSX.Element {
	return (
		<div className={styles.singleMatchActionContainer}>
			<Button onClick={hostsHandler}>Play for Hosts</Button>
			<Button onClick={aiHandler}>AI vs AI</Button>
			<Button onClick={guestsHandler}>Play for Guests</Button>
		</div>
	);
}
