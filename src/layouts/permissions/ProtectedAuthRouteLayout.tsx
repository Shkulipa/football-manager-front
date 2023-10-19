'use client';

import { ROUTES } from '@/constants/routes.enum';
import { useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

/**
 * @info
 * For this route is blocked for authorized users
 */

interface IAuthRouterProps extends PropsWithChildren {}

export const ProtectedAuthRouterLayout = ({ children }: IAuthRouterProps) => {
	const { user } = useAppSelector(state => state.userReducer);
	const router = useRouter();

	if (user) {
		router.replace(ROUTES.HOME);
		return;
	}

	return <>{children}</>;
};
