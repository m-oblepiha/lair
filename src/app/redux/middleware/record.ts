import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from 'redux/types';
import { addRecord } from 'redux/actions';
import { isAct } from 'redux/actions/acts';
import { isResponse } from 'redux/actions/responses';
import { isInteraction } from 'redux/actions/interactions';
import {
  actMessage,
  responseMessage,
  interactionMessage,
} from 'common/utils/textgen';

const recordsMiddleware: Middleware<{}, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const act = next(action);
    if (isAct(action)) dispatch(addRecord(actMessage(action)));
    if (isResponse(action)) dispatch(addRecord(responseMessage(action)));
    if (isInteraction(action)) dispatch(addRecord(interactionMessage(action)));
    return act;
  };

export { recordsMiddleware };
