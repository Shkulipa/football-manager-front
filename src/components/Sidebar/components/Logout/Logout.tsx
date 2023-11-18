'use client';

import { useAppDispatch } from '@/hooks/redux';
import { Login } from '@/icons';
import { MenuItem } from 'react-pro-sidebar';
import styles from './Logout.module.scss';
import { logout } from '@/layouts/AuthLayout/store/user';

export const Logout = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<MenuItem
			icon={<Login fill="red" width={30} height={30} direction="down" />}
			onClick={logoutHandler}
			className={styles.text}
		>
			Logout
		</MenuItem>
	);
};
