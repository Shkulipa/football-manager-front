'use client';

import cn from 'classnames';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Htag, Ptag } from '..';
import { IGlobalModalProps } from './GlobalModal.types';
import styles from './GlobalModal.module.scss';
import { Close } from '@/icons/Close';

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
			<div className={styles.globalModal} ref={ref}>
				<div className={styles.closeIcon} onClick={callbackClose}>
					<Close />
				</div>

				<Htag className={styles.title} tag="h3">
					{title}
				</Htag>
				<Ptag size="m">{description}</Ptag>
			</div>
		</div>
	);
};
