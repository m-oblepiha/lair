import type { AnyAction, ThunkDispatch, Dispatch } from '@reduxjs/toolkit';
import { store, rootReducer } from './store';

type RootState = ReturnType<typeof rootReducer>;
type TypedDispatch = ThunkDispatch<RootState, unknown, AnyAction> &
  Dispatch<AnyAction>;

type AppDispatch = typeof store.dispatch;
type AppGetState = typeof store.getState;

export type { RootState, AppDispatch, AppGetState, TypedDispatch };

export type { ActType, ActAction } from 'redux/actions/acts';
export type { ResponseType, ResponseAction } from 'redux/actions/responses';
export type { EffectType, EffectAction } from 'redux/actions/effects';
export type {
  InteractionType,
  InteractionAction,
} from 'redux/actions/interactions';
