import { createSlice } from '@reduxjs/toolkit';
import type { IPet } from 'common/types';

import { actReducers, actTypes } from './acts';
import { effectReducers, effectTypes } from './effects';
import { responseReducers, responseTypes } from './responses';

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

const acts = pick(petsSlice.actions, actTypes);
const responses = pick(petsSlice.actions, responseTypes);
const effects = pick(petsSlice.actions, effectTypes);

export { petsReducer, acts, responses, effects };
