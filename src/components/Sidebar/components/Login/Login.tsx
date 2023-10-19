import { ROUTES } from '@/constants/routes.enum';
import Link from 'next/link';
import React from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { Login as LoginIcon } from '@/icons';

export const Login = () => {
	return (
		<MenuItem
			icon={<LoginIcon width={30} height={30} />}
			component={<Link href={ROUTES.AUTH_SIGN_IN} />}
		>
			Log in
		</MenuItem>
	);
};
