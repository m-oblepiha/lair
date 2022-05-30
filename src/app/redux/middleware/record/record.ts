import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from 'redux/types';
import { addRecord } from 'redux/actions';
import { isAct } from 'redux/actions/acts';
import { isResponse } from 'redux/actions/responses';
import { isInteraction } from 'redux/actions/interactions';
import { transformActMessage } from './transformActMessage';
import { transformResponseMessage } from './transformResponseMessage';
import { transformInteractionMessage } from './transformInteractionMessage';

const recordsMiddleware: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const act = next(action);
    const { pets } = getState();
    if (isAct(action)) dispatch(addRecord(transformActMessage(pets, action)));
    if (isResponse(action))
      dispatch(addRecord(transformResponseMessage(pets, action)));
    if (isInteraction(action))
      dispatch(addRecord(transformInteractionMessage(pets, action)));
    return act;
  };

export { recordsMiddleware };
