import { configureStore } from '@reduxjs/toolkit';

import { heartsReducer } from './slices/heartsSlice';
import { timeReducer } from './slices/timeSlice';
import { lastActReducer } from './slices/lastActSlice';
import { messagesReducer } from './slices/messagesSlice';
import { petsReducer } from './slices/petsSlice';

const store = configureStore({
  reducer: {
    hearts: heartsReducer,
    time: timeReducer,
    lastAct: lastActReducer,
    messages: messagesReducer,
    pets: petsReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, type RootState, type AppDispatch };
