import { Button } from '@/components';
import { useSocialLogin } from '../../hooks/useSocialLogin';
import styles from './FacebookLogin.module.scss';
import { Facebook } from '@/icons/Facebook';

export const FacebookLogin = (): JSX.Element => {
	const { socialLogin } = useSocialLogin({ social: 'facebook' });

	return (
		<Button className={styles.btn} onClick={socialLogin}>
			<div>
				<Facebook />
			</div>
			<div>Sign In by Facebook</div>
		</Button>
	);
};
