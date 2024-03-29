'use client';

import { ContentLoader } from '@/components';
import { EKeyLocalStorage } from '@/constants/keys-local-storage';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
	IAuthUser,
	refreshToken,
	setUser
} from '@/layouts/AuthLayout/store/user';
import { ICommonBasePropsWithChildren } from '@/types/others/commonProps';
import { useEffect } from 'react';

interface IAuthLayoutProps extends ICommonBasePropsWithChildren {}

export const AuthLayout = ({ children }: IAuthLayoutProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(s => s.userReducer);
	const { isLoading } = useAppSelector(s => s.baseLayoutReducer);

	useEffect(() => {
		const userJSON = localStorage.getItem(EKeyLocalStorage.USER);

		if (userJSON && !user) {
			const user = JSON.parse(userJSON) as IAuthUser['user'];
			const expiry = JSON.parse(atob(user!.accessToken.split('.')[1])).exp;
			const isExpired = Date.now() >= expiry * 1000;

			if (isExpired) {
				// if expired -> try refresh by refreshToken from cookie
				dispatch(refreshToken());
			} else {
				// is not expired yet -> set in user store
				dispatch(setUser(user));
			}
		}
	}, [user, dispatch]);

	if (isLoading) return <ContentLoader />;

	return <>{children}</>;
};
