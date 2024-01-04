import { CenterContainer } from '@/containers';
import { Loader } from '..';

export const ContentLoader = (): JSX.Element => {
	return (
		<CenterContainer>
			<Loader size="l" />
		</CenterContainer>
	);
};
