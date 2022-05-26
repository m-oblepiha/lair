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
  manaReducer,
} from 'redux/reducers';

const preloadedState = getState();

const reducerMap = {
  hearts: heartsReducer,
  time: timeReducer,
  records: recordsReducer,
  pets: petsReducer,
  mana: manaReducer,
};

const rootReducer = combineReducers(reducerMap);

const store = configureStore({
  preloadedState,
  reducer: reducerMap,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(responseMiddleware)
      .concat(localStorageMiddleware)
      .concat(recordsMiddleware),
});

export { store, rootReducer, preloadedState };
