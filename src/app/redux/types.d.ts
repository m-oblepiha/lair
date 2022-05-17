import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import { store } from './store';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

type Action<T extends string, U> = { type: T; payload: U };

type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type { RootState, AppDispatch, Action, Thunk };

export type { ActType, ActAction } from 'redux/actions/acts';
export type { ResponseType, ResponseAction } from 'redux/actions/responses';
export type { EffectType, EffectAction } from 'redux/actions/effects';
