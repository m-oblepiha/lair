import { createSlice } from '@reduxjs/toolkit';
import type { IPet } from 'common/types';

import { actDrafts, type ActType } from './acts';
import { effectDrafts, type EffectType } from './effects';
import { responseDrafts, type ResponseType } from './responses';

import { pick } from 'common/utils';

const initialState: IPet[] = [];

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    ...actDrafts,
    ...effectDrafts,
    ...responseDrafts,
  },
});

const petsReducer = petsSlice.reducer;

const acts = pick(petsSlice.actions, Object.keys(actDrafts) as Array<ActType>);

const responses = pick(
  petsSlice.actions,
  Object.keys(responseDrafts) as Array<ResponseType>
);

const effects = pick(
  petsSlice.actions,
  Object.keys(effectDrafts) as Array<EffectType>
);

export { petsReducer, acts, responses, effects };
