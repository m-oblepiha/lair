import type { Middleware } from '@reduxjs/toolkit';
import type { RootState, TypedDispatch, ActAction } from 'redux/types';
import { death } from 'redux/actions';
import { isAct } from 'redux/actions/acts';
import { checkForDead } from 'redux/thunks/checkForDead';
import { respondToAct } from './respondToAct';
import { respondToDeath } from './respondToDeath';

const responseMiddleware: Middleware<
  (action: ActAction) => AbortController,
  RootState,
  TypedDispatch
> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const act = next(action);
    if (death.match(action)) dispatch(respondToDeath(action));
    if (isAct(action)) {
      dispatch(checkForDead());
      const controller = new AbortController();
      dispatch(respondToAct(action, controller.signal));
      return controller;
    }
    return act;
  };

export { responseMiddleware };
