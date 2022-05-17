import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from 'redux/types';

const abortMiddleware: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    return next(action);
  };

export { abortMiddleware };
