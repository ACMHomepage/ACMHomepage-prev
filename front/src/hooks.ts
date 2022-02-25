import {
  TypedUseSelectorHook,
  useDispatch as useDispatchOrigin,
  useSelector as useSelectorOrigin,
} from 'react-redux';
import type { RootState, AppDispatch } from './store/store';

export const useDispatch = () => useDispatchOrigin<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOrigin;
