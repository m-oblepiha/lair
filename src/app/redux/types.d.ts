import type {
  AnyAction,
  ThunkAction,
  ThunkDispatch,
  Dispatch,
} from '@reduxjs/toolkit';
import { rootReducer } from './store';

type RootState = ReturnType<typeof rootReducer>;
// type AppDispatch = typeof store.dispatch;
type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction> &
  Dispatch<AnyAction>;

type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type { RootState, AppDispatch, Thunk };

export type { ActType, ActAction } from 'redux/actions/acts';
export type { ResponseType, ResponseAction } from 'redux/actions/responses';
export type { EffectType, EffectAction } from 'redux/actions/effects';
export type {
  InteractionType,
  InteractionAction,
} from 'redux/actions/interactions';
