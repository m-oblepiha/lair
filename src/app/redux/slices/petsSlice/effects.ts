import type { PayloadAction } from '@reduxjs/toolkit';
import type { IPet } from 'common/types';
import type {
  SummonEffect,
  DeathEffect,
  RestEffect,
} from 'common/types/effect';
import { selectPet } from 'common/utils';
import { roll } from 'common/utils/rolls';

const summon = (state: IPet[], action: PayloadAction<SummonEffect>) => {
  state.push(action.payload.target);
};

const death = (state: IPet[], action: PayloadAction<DeathEffect>) => {
  state = state.filter((pet) => pet.id !== action.payload.target);
  state.forEach((pet) => delete pet.relations[action.payload.target]);
};

const rest = (state: IPet[], action: PayloadAction<RestEffect>) => {
  const pet = selectPet(state, action.payload.target);
  if (!pet) return;

  const { fatigue, morale, hunger, health } = pet.stats;

  if (fatigue > 3) pet.stats.fatigue = pet.stats.fatigue - 3;
  else {
    pet.stats.fatigue = 0;
    if (morale !== 10) pet.stats.morale++;
    if (hunger === 0 && health !== 10) pet.stats.health++;
  }
};

const tire = {
  prepare: () => ({
    payload: { preroll: roll(1, 15) },
  }),
  reducer: (state: IPet[], action: PayloadAction<{ preroll: number }>) => {
    const { preroll } = action.payload;

    for (const pet of state) {
      if (!pet.stats.isAwake) continue;
      const { fatigue, morale } = pet.stats;
      const { vitality, willpower } = pet.attributes;
      if (fatigue === 10) {
        if (morale === 0 && preroll > vitality) pet.stats.health--;
        else if (preroll > willpower) pet.stats.morale--;
      } else pet.stats.fatigue++;
    }
  },
};

const starve = {
  prepare: () => ({
    payload: { preroll: roll(1, 15) },
  }),
  reducer: (state: IPet[], action: PayloadAction<{ preroll: number }>) => {
    const { preroll } = action.payload;

    for (const pet of state) {
      const hunger = pet.stats.hunger;
      const { vitality, willpower } = pet.attributes;
      if (hunger === 10) {
        if (preroll > vitality) pet.stats.health--;
        if (preroll > willpower) pet.stats.morale--;
      } else pet.stats.hunger++;
    }
  },
};

const age = (state: IPet[]) => {
  for (const pet of state) {
    pet.stats.age++;
    if (pet.stats.age > pet.attributes.maxAge) pet.stats.health = 0;
  }
};

const effectReducers = {
  summon,
  death,
  rest,
  tire,
  starve,
  age,
};

type EffectType = keyof typeof effectReducers;
const effectTypes = Object.keys(effectReducers) as EffectType[];

export { effectReducers, effectTypes, type EffectType };
