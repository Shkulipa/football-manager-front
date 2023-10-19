import { LoaderContainer } from '@/containers';
import { Loader } from '..';

export const ContentLoader = (): JSX.Element => {
	return (
		<LoaderContainer>
			<Loader size="l" />
		</LoaderContainer>
	);
};
