import { createSlice } from '@reduxjs/toolkit';

import { effects } from './petsSlice';

const initialState: number = 10;

const heartsSlice = createSlice({
  name: 'hearts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(effects.death, (state) => state--);
  },
});

const heartsReducer = heartsSlice.reducer;

export { heartsReducer };
