'use client';

import cn from 'classnames';
import { useClickOutside } from '@/hooks/useClickOutside';
import { IGlobalModalProps } from './GlobalModal.types';
import styles from './GlobalModal.module.scss';
import { CardContentModal } from '../CardContentModal';
import { Card } from '..';

export const GlobalModal = ({
	title,
	description,
	isShow,
	callbackClose
}: IGlobalModalProps): JSX.Element => {
	const ref = useClickOutside(callbackClose);

	return (
		<div
			className={cn(styles.globalContainer, {
				[styles.hidden]: !isShow
			})}
		>
			<Card className={styles.globalModal}>
				<CardContentModal
					isShowCloseButton
					title={title}
					description={description}
					ref={ref}
					callbackClose={callbackClose}
				/>
			</Card>
		</div>
	);
};
