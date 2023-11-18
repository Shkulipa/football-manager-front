import { ROUTES } from '@/constants/routes.enum';
import { useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';

export function useValidateMatch() {
	const { hosts, guests } = useAppSelector(state => state.singleMatchReducer);
	const router = useRouter();

	// if teams weren't picked -> redirect to single-match page
	if (!hosts || !guests) router.replace(ROUTES.SINGLE_MATCH);
}
