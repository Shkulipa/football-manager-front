'use client';

import { PaddingContainer } from '@/containers';
import React from 'react';
import { UpdateUsername } from './components/UpdateUsername/UpdateUsername';
import { UpdatePassword } from './components/UpdatePassword/UpdatePassword';
import styles from './Profile.module.scss';
import { UpdateEmail } from './components/UpdateEmail/UpdateEmail';

export const Profile = (): JSX.Element => {
	return (
		<PaddingContainer>
			<div className={styles.profileWrapper}>
				<UpdateUsername />
				<UpdatePassword />
				<UpdateEmail />
			</div>
		</PaddingContainer>
	);
};
