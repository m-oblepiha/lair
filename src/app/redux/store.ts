import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { responseMiddleware, recordsMiddleware } from './middleware';

import {
  heartsReducer,
  timeReducer,
  recordsReducer,
  petsReducer,
} from 'redux/reducers';

const rootReducer = combineReducers({
  hearts: heartsReducer,
  time: timeReducer,
  records: recordsReducer,
  pets: petsReducer,
});

const store = configureStore({
  reducer: {
    hearts: heartsReducer,
    time: timeReducer,
    records: recordsReducer,
    pets: petsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(responseMiddleware).concat(recordsMiddleware),
});

export { store, rootReducer };
