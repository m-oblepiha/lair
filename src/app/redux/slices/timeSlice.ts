import { createSlice } from '@reduxjs/toolkit';

type Phase = 1 | 2 | 3 | 4;

const initialState: { day: number; phase: Phase } = {
  day: 0,
  phase: 1,
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    increment: ({ day, phase }) =>
      phase === 4 ? { day: day++, phase: 1 } : { day, phase: phase++ as Phase },
  },
});

const timeReducer = timeSlice.reducer;
const { increment } = timeSlice.actions;

export { timeReducer, increment };
