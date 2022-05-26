import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from 'redux/types';
import { setState } from 'common/utils';

const localStorageMiddleware: Middleware<{}, RootState> =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);

    setState(getState());

    return result;
  };

export { localStorageMiddleware };
