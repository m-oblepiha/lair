import type { RestEffect } from 'common/types/effect';
import { createAction } from '@reduxjs/toolkit';
import { roll } from 'common/utils/rolls';

const rest = createAction<RestEffect, 'pets/rest'>('pets/rest');
const tire = createAction('pets/tire', () => ({
  payload: { preroll: roll(1, 15) },
}));
const starve = createAction('pets/starve', () => ({
  payload: { preroll: roll(1, 15) },
}));
const age = createAction('pets/age');

const effectActions = [rest, tire, starve, age];
type EffectAction = ReturnType<typeof effectActions[number]>;
type EffectType = EffectAction['type'];

export type { EffectType, EffectAction };
export { rest, tire, starve, age };
