import { ISignInRes } from '@/api/rest/auth/types/sign-in-res';

export interface IAccessTokenData
	extends Pick<ISignInRes, '_id' | 'email' | 'roles' | 'username'> {}
