import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from 'redux/types';
import { addRecord } from 'redux/actions';
import { isAct } from 'redux/actions/acts';
import { isResponse } from 'redux/actions/responses';
import { isInteraction } from 'redux/actions/interactions';

const recordsMiddleware: Middleware<{}, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const act = next(action);
    if (isAct(action) || isResponse(action) || isInteraction(action))
      dispatch(addRecord(action));
    return act;
  };

export { recordsMiddleware };
