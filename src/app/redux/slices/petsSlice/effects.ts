import type { PayloadAction } from '@reduxjs/toolkit';
import type { IPet } from 'common/types';
import type {
  SummonEffect,
  DeathEffect,
  RestEffect,
  TireEffect,
  StarveEffect,
} from 'common/types/effect';
import { roll } from 'common/utils/rolls';
import { selectPet } from 'common/utils';

const summon = (
  state: IPet[],
  action: PayloadAction<Omit<SummonEffect, 'type'>>
) => {
  state.push(action.payload.target);
};

const death = (
  state: IPet[],
  action: PayloadAction<Omit<DeathEffect, 'type'>>
) => {
  state
    .filter((pet) => pet.id !== action.payload.target)
    .forEach((pet) => delete pet.relations[action.payload.target]);
};

const rest = (
  state: IPet[],
  action: PayloadAction<Omit<RestEffect, 'type'>>
) => {
  const pet = selectPet(state, action.payload.target);
  if (!pet) return;

  const { fatigue, morale, hunger, health } = pet.stats;

  if (fatigue !== 0) pet.stats.fatigue--;
  else {
    if (morale !== 10) pet.stats.morale++;
    if (hunger === 0 && health !== 10) pet.stats.health++;
  }
};

const tire = {
  prepare: (action: Omit<TireEffect, 'type'>) => ({
    payload: { ...action, preroll: roll(1, 15) },
  }),
  reducer: (
    state: IPet[],
    action: PayloadAction<Omit<TireEffect, 'type'> & { preroll: number }>
  ) => {
    const { target, preroll } = action.payload;

    const pet = selectPet(state, target);
    if (!pet) return;

    const { fatigue, morale } = pet.stats;
    const { vitality, willpower } = pet.attributes;

    if (fatigue === 10) {
      if (morale === 0 && preroll > vitality) pet.stats.health--;
      else if (preroll > willpower) pet.stats.morale--;
    } else pet.stats.fatigue++;
  },
};

const starve = {
  prepare: (action: Omit<StarveEffect, 'type'>) => ({
    payload: { ...action, preroll: roll(1, 15) },
  }),
  reducer: (
    state: IPet[],
    action: PayloadAction<Omit<StarveEffect, 'type'> & { preroll: number }>
  ) => {
    const { target, preroll } = action.payload;

    const pet = selectPet(state, target);
    if (!pet) return;

    const hunger = pet.stats.hunger;
    const { vitality, willpower } = pet.attributes;

    if (hunger === 10) {
      if (preroll > vitality) pet.stats.health--;
      if (preroll > willpower) pet.stats.morale--;
    } else pet.stats.hunger++;
  },
};

const effectDrafts = {
  summon,
  death,
  rest,
  tire,
  starve,
};

type EffectType = keyof typeof effectDrafts;

export { effectDrafts, type EffectType };
