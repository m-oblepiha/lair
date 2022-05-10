import type { MessageSeed } from 'common/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { generateMessage } from 'common/utils/textgen';

const initialState: string[] = [];

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    add: {
      prepare: (seed: MessageSeed) => ({
        payload: generateMessage(seed),
      }),
      reducer: (state, action: PayloadAction<string>) => {
        state.unshift(action.payload);
        if (state.length > 50) state.pop();
      },
    },
  },
});

const messagesReducer = messageSlice.reducer;
const { add } = messageSlice.actions;

export { messagesReducer, add };
