import { Loader } from '@/components';
import { LoaderContainer } from '@/containers';

const Loading = () => {
	return (
		<LoaderContainer>
			<Loader size="l" />
		</LoaderContainer>
	);
};

export default Loading;
