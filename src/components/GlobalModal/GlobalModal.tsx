'use client';

import cn from 'classnames';
import { useClickOutside } from '@/hooks/useClickOutside';
import { IGlobalModalProps } from './GlobalModal.types';
import styles from './GlobalModal.module.scss';
import { Card } from '..';

export const GlobalModal = ({
	children,
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
			<div ref={ref}>
				<Card className={styles.globalModal}>{children}</Card>
			</div>
		</div>
	);
};
