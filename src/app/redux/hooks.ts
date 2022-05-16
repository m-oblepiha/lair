import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
  shallowEqual,
} from 'react-redux';
import type { RootState, AppDispatch } from './types';

const useTypedDispatch = () => useDispatch<AppDispatch>();
const useTypedSelector: TypedUseSelectorHook<RootState> = (selector) =>
  useSelector(selector, shallowEqual);

export { useTypedDispatch, useTypedSelector };
