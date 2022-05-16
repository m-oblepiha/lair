import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.unshift(action.payload);
      if (state.length > 50) state.pop();
    },
  },
});

const recordsReducer = recordsSlice.reducer;
const { add } = recordsSlice.actions;

export { recordsReducer, add };
