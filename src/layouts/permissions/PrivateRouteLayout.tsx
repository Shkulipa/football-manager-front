'use client';

import { ROUTES } from '@/constants/routes.enum';
import { useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

/**
 * @info
 * For this route you need be authorized
 */

interface IPrivateRouterProps extends PropsWithChildren {}

export const PrivateRouteLayout = ({ children }: IPrivateRouterProps) => {
	const { user } = useAppSelector(state => state.userReducer);
	const router = useRouter();

	if (!user) {
		router.replace(ROUTES.HOME);
		return;
	}

	return <>{children}</>;
};
