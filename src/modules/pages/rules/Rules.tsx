'use client';

import { TextLink } from '@/components';
import { ROUTES } from '@/constants/routes.enum';
import styles from './Rules.module.scss';
import { PaddingContainer } from '@/containers';

export const Rules = () => {
	return (
		<PaddingContainer className={styles.rulesCenter}>
			<div className={styles.rulesWrapper}>
				<TextLink href={ROUTES.PRIVACY_POLICY} text="Privacy Policy" />
				<TextLink href={ROUTES.TERMS_CONDITIONS} text="Terms Conditions" />
			</div>
		</PaddingContainer>
	);
};
