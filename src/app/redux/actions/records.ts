import { createAction } from '@reduxjs/toolkit';
import type { ActAction } from 'redux/actions/acts';
import type { ResponseAction } from 'redux/actions/responses';
import type { InteractionAction } from 'redux/actions/interactions';

const addRecord = createAction<
  ActAction | ResponseAction | InteractionAction,
  'records/add'
>('records/add');

export { addRecord };
