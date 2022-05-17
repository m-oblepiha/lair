import { createReducer } from '@reduxjs/toolkit';
import { addRecord } from 'redux/actions';

const initialState: string[] = [];

const recordsReducer = createReducer(initialState, (builder) => {
  builder.addCase(addRecord, (state, action) => {
    state.unshift(action.payload);
    if (state.length > 50) state.pop();
  });
});

export { recordsReducer };