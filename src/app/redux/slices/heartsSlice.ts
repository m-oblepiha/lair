import { createSlice } from '@reduxjs/toolkit';

const initialState: number = 10;

const heartsSlice = createSlice({
  name: 'hearts',
  initialState,
  reducers: {
    decrement: (state) => state--,
  },
});

const heartsReducer = heartsSlice.reducer;
const { decrement } = heartsSlice.actions;

export { heartsReducer, decrement };
