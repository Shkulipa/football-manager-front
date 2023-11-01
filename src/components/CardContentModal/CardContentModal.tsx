import cn from 'classnames';
import { Close } from '@/icons/Close';
import { Htag, Ptag } from '..';
import { ICardContentModalProps } from './CardContentModal.types';
import styles from './CardContentModal.module.scss';
import { ForwardedRef, forwardRef } from 'react';

/**
 * Card for describe something
 */
export const CardContentModal = forwardRef(
	(
		{
			title,
			description,
			callbackClose,
			isShowCloseButton,
			className,
			children,
			...props
		}: ICardContentModalProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const closeButton = isShowCloseButton && (
			<div className={styles.closeIcon} onClick={callbackClose}>
				<Close />
			</div>
		);

		const titleRender = title && (
			<Htag className={styles.title} tag="h3">
				{title}
			</Htag>
		);

		const descriptionRender = title && <Ptag size="m">{description}</Ptag>;

		return (
			<div className={cn(styles.modal, className)} ref={ref || null} {...props}>
				{closeButton}

				{titleRender}
				{descriptionRender}
				{children}
			</div>
		);
	}
);
