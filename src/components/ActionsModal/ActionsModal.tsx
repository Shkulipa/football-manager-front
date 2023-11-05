import React from 'react';
import { Button } from '..';
import styles from './ActionsModal.module.scss';
import { IActionsModalProps } from './ActionsModal.types';

export const ActionsModal = ({
	onConfirm,
	onCancel
}: IActionsModalProps): JSX.Element => {
	return (
		<div className={styles.actionsConfirm}>
			<Button type="button" onClick={onConfirm}>
				Confirm
			</Button>
			<Button type="button" onClick={onCancel}>
				Cancel
			</Button>
		</div>
	);
};
