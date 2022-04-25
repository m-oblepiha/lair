import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Act } from 'common/types';

const initialState = null as Act | null;

const lastActSlice = createSlice({
  name: 'lastAct',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Act>) => (state = action.payload),
  },
});

const lastActReducer = lastActSlice.reducer;
const { set } = lastActSlice.actions;

export { lastActReducer, set };
