import type { PayloadAction } from '@reduxjs/toolkit';
import type { ID, IPet } from 'common/types';
import { roll } from 'common/utils/rolls';
import { selectPet } from '../utils';

const summon = (state: IPet[], action: PayloadAction<IPet>) => {
  state.push(action.payload);
};

const death = (state: IPet[], action: PayloadAction<ID>) => {
  state
    .filter((pet) => pet.id !== action.payload)
    .forEach((pet) => delete pet.relations[action.payload]);
};

const rest = (state: IPet[], action: PayloadAction<ID>) => {
  const pet = selectPet(state, action.payload);
  if (!pet) return;
  const { fatigue, morale, hunger, health } = pet.stats;
  if (fatigue !== 0) pet.stats.fatigue--;
  else {
    if (morale !== 10) pet.stats.morale++;
    if (hunger === 0 && health !== 10) pet.stats.health++;
  }
};

const tire = {
  prepare: (actor: ID) => ({ payload: { actor, preroll: roll(1, 15) } }),
  reducer: (
    state: IPet[],
    action: PayloadAction<{ actor: ID; preroll: number }>
  ) => {
    const pet = selectPet(state, action.payload.actor);
    if (!pet) return;
    const preroll = action.payload.preroll;
    const { fatigue, morale } = pet.stats;
    const { vitality, willpower } = pet.attributes;
    if (fatigue === 10) {
      if (morale === 0 && preroll > vitality) pet.stats.health--;
      else if (preroll > willpower) pet.stats.morale--;
    } else pet.stats.fatigue++;
  },
};

const starve = {
  prepare: (actor: ID) => ({ payload: { actor, preroll: roll(1, 15) } }),
  reducer: (
    state: IPet[],
    action: PayloadAction<{ actor: ID; preroll: number }>
  ) => {
    const pet = selectPet(state, action.payload.actor);
    if (!pet) return;
    const preroll = action.payload.preroll;
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
