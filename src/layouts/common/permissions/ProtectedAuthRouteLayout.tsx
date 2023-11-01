'use client';

import { ROUTES } from '@/constants/routes.enum';
import { useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

/**
 * @info
 * For this route is blocked for authorized users
 */

interface IAuthRouterProps extends PropsWithChildren {}

export const ProtectedAuthRouterLayout = ({ children }: IAuthRouterProps) => {
	const { user } = useAppSelector(s => s.userReducer);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.replace(ROUTES.HOME);
		}
	}, [user]);

	return <>{children}</>;
};
