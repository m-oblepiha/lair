import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  responseMiddleware,
  recordsMiddleware,
  localStorageMiddleware,
} from './middleware';
import { getState } from 'common/utils';
import {
  heartsReducer,
  timeReducer,
  recordsReducer,
  petsReducer,
} from 'redux/reducers';

const preloadedState = getState();

const rootReducer = combineReducers({
  hearts: heartsReducer,
  time: timeReducer,
  records: recordsReducer,
  pets: petsReducer,
});

const store = configureStore({
  preloadedState,
  reducer: {
    hearts: heartsReducer,
    time: timeReducer,
    records: recordsReducer,
    pets: petsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(responseMiddleware)
      .concat(localStorageMiddleware)
      .concat(recordsMiddleware),
});

export { store, rootReducer, preloadedState };
