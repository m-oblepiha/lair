import { createSlice } from '@reduxjs/toolkit';
import type { IPet } from 'common/types';

import { actReducers, type ActType } from './acts';
import { effectReducers, type EffectType } from './effects';
import { responseReducers, type ResponseType } from './responses';

import { pick } from 'common/utils';

const initialState: IPet[] = [];

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    ...actReducers,
    ...effectReducers,
    ...responseReducers,
  },
});

const petsReducer = petsSlice.reducer;

const acts = pick(petsSlice.actions, Object.keys(actReducers) as ActType[]);

const responses = pick(
  petsSlice.actions,
  Object.keys(responseReducers) as ResponseType[]
);

const effects = pick(
  petsSlice.actions,
  Object.keys(effectReducers) as EffectType[]
);

export { petsReducer, acts, responses, effects };
