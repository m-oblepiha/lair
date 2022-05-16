import { configureStore } from '@reduxjs/toolkit';

import { heartsReducer } from './slices/heartsSlice';
import { timeReducer } from './slices/timeSlice';
import { recordsReducer } from './slices/recordsSlice';
import { petsReducer } from './slices/petsSlice';

const store = configureStore({
  reducer: {
    hearts: heartsReducer,
    time: timeReducer,
    records: recordsReducer,
    pets: petsReducer,
  },
});

export { store };
