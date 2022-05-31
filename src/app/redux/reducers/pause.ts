import { createReducer } from '@reduxjs/toolkit';
import { pause } from 'redux/actions';

const initialState: boolean = false;

const pauseReducer = createReducer(initialState, (builder) => {
  builder.addCase(pause, (state) => !state);
});

export { pauseReducer };
