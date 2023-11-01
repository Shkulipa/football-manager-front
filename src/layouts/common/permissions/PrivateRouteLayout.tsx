'use client';

import { ROUTES } from '@/constants/routes.enum';
import { useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

/**
 * @info
 * For this route you need be authorized
 */

interface IPrivateRouterProps extends PropsWithChildren {}

export const PrivateRouteLayout = ({ children }: IPrivateRouterProps) => {
	const { user } = useAppSelector(s => s.userReducer);
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.replace(ROUTES.HOME);
			return;
		}
	}, [user]);

	return <>{children}</>;
};
