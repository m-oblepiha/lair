import { createReducer } from '@reduxjs/toolkit';
import { timePass } from 'redux/actions';

type Phase = 1 | 2 | 3 | 4;

const initialState: { day: number; phase: Phase } = {
  day: 1,
  phase: 2,
};

const timeReducer = createReducer(initialState, (builder) => {
  builder.addCase(timePass, ({ day, phase }) =>
    phase === 4
      ? { day: day + 1, phase: 1 }
      : { day, phase: (phase + 1) as Phase }
  );
});

export { timeReducer };
