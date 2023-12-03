'use client';

import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { ContentLoader } from '@/components';
import { useSearchParams } from 'next/navigation';
import { IAccessTokenData } from '@/types/others/accessTokenData';
import { ISignInRes } from '@/api/rest/auth/types/sign-in-res';
import { useAppDispatch } from '@/hooks/redux';
import { setUser } from '@/layouts/AuthLayout/store/user';
import { EKeyLocalStorage } from '@/constants/keys-local-storage';

export const SocialIn = () => {
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();

	useEffect(() => {
		const accessToken = searchParams.get('accessToken');

		if (accessToken) {
			const decodedAccessToken = jwtDecode(accessToken) as IAccessTokenData;

			const user: ISignInRes = {
				_id: decodedAccessToken._id,
				email: decodedAccessToken.email,
				username: decodedAccessToken.username,
				roles: decodedAccessToken.roles,
				accessToken
			};

			// set user
			dispatch(setUser(user));
			const userJSON = JSON.stringify(user);
			localStorage.setItem(EKeyLocalStorage.USER, userJSON);
		}
	}, [searchParams]);

	return <ContentLoader />;
};
