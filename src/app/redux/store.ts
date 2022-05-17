import { configureStore } from '@reduxjs/toolkit';

import {
  heartsReducer,
  timeReducer,
  recordsReducer,
  petsReducer,
} from 'redux/reducers';

const store = configureStore({
  reducer: {
    hearts: heartsReducer,
    time: timeReducer,
    records: recordsReducer,
    pets: petsReducer,
  },
});

export { store };
