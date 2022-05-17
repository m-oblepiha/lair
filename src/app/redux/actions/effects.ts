import type { AnyAction } from '@reduxjs/toolkit';
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

const isEffect = (action: AnyAction): action is EffectAction => {
  for (const effect of effectActions) {
    if (action?.type === effect.type) return true;
  }
  return false;
};

export type { EffectType, EffectAction };
export { isEffect, rest, tire, starve, age };
