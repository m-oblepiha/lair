import type { Middleware } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from 'redux/types';
import { death } from 'redux/actions';
import { isAct } from 'redux/actions/acts';
import { respondToAct } from './respondToAct';
import { respondToDeath } from './respondToDeath';

const responseMiddleware: Middleware<{}, RootState, AppDispatch> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const act = next(action);
    const { pets } = getState();
    if (death.match(action)) dispatch(respondToDeath(pets, action));
    if (isAct(action)) dispatch(respondToAct(pets, action));
    return act;
  };

export { responseMiddleware };
