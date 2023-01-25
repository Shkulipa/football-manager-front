import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from 'src/store/store';

// Use throughout your app instead of plain  `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
