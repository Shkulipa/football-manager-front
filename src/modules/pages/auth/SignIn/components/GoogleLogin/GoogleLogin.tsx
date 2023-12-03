import { Button } from '@/components';
import { useSocialLogin } from '../../hooks/useSocialLogin';
import { Google } from '@/icons/Google';
import styles from './GoogleLogin.module.scss';

export const GoogleLogin = (): JSX.Element => {
	const { socialLogin } = useSocialLogin({ social: 'google' });

	return (
		<Button className={styles.btn} onClick={socialLogin}>
			<div>
				<Google />
			</div>
			<div>Sign In by Google</div>
		</Button>
	);
};
