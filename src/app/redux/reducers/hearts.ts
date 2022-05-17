import { createReducer } from '@reduxjs/toolkit';
import { death } from 'redux/actions';

const initialState: number = 10;

const heartsReducer = createReducer(initialState, (builder) => {
  builder.addCase(death, (state) => state--);
});

export { heartsReducer };
