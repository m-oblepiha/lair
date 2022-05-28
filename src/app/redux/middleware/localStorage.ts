import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from 'redux/types';
import { setState } from 'common/utils';

const localStorageMiddleware: Middleware<{}, RootState> =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);

    const state = getState();

    if (state.hearts === 0) {
      setState(null);
      return result;
    }

    setState(state);

    return result;
  };

export { localStorageMiddleware };
