import { useNavigate } from 'react-router-dom';
import { Arrow } from 'src/components';

import { IArrowBackProps } from './arrowBack.interfaces';
import styles from './arrowBack.module.scss';

export function ArrowBack({ to }: IArrowBackProps) {
	const navigate = useNavigate();

	return <Arrow onClick={() => navigate(to)} className={styles.arrowBack} />;
}
