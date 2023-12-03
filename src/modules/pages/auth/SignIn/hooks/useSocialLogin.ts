import { SERVER_URL } from '@/constants';
import { useAppDispatch } from '@/hooks/redux';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { useRouter } from 'next/navigation';

interface IUseSocialLoginProps {
	social: 'google' | 'facebook';
}

export const useSocialLogin = ({ social }: IUseSocialLoginProps) => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const socialLogin = () => {
		try {
			router.push(`${SERVER_URL}/auth/${social}`);
		} catch (e) {
			handleActionErrors({ e, dispatch });
		}
	};

	return { socialLogin };
};
