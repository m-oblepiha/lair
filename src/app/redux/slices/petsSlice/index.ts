import { createSlice } from '@reduxjs/toolkit';
import type { IPet } from 'common/types';

import { actDrafts, type ActType } from './drafts/acts';
import { effectDrafts, type EffectType } from './drafts/effects';
import { responseDrafts, type ResponseType } from './drafts/responses';

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
  Object.keys(responseDrafts) as Array<EffectType>
);
const effects = pick(
  petsSlice.actions,
  Object.keys(effectDrafts) as Array<ResponseType>
);

export { petsReducer, acts, responses, effects };
