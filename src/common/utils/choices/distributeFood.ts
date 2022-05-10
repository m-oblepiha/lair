import type { IPet } from 'common/types';
import { clipProbability } from 'common/utils';
import { roll } from 'common/utils/rolls';
import { selectBestChoice } from './selectBestChoice';

const supplyShareProbability = (
  actor: IPet,
  target: IPet,
  foodAmount: number
) => {
  const { friendliness } = actor.attributes;
  const { morale, hunger } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;
  const targetHunger = target.stats.hunger;

  const COEFF = {
    friendlinessWeight: 4,
    moraleWeight: 2,
    hungerWeight: -5,
    targetHungerWeight: 3,
    relWeight: 10,
    rollWeight: 5,
    offset: -80,
    divisor: 14,
  };

  if (foodAmount < 2) return 0;

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.moraleWeight * morale +
      COEFF.hungerWeight * hunger +
      COEFF.targetHungerWeight * targetHunger +
      COEFF.relWeight * rel +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const supplyStealProbability = (
  actor: IPet,
  target: IPet,
  foodAmount: number
) => {
  const { friendliness } = actor.attributes;
  const { morale, hunger } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: -4,
    moraleWeight: -2,
    hungerWeight: 10,
    relWeight: -10,
    rollWeight: 7.5,
    offset: -90,
    divisor: 16,
  };

  if (foodAmount < 1) return 0;

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.moraleWeight * morale +
      COEFF.hungerWeight * hunger +
      COEFF.relWeight * rel +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const distributeFood = (pets: IPet[], actor: IPet, value: number) => {
  const otherPets = pets.filter((pet) => pet.id !== actor.id);
  const choices = otherPets.flatMap((pet) => [
    {
      target: pet.id,
      type: 'steal' as const,
      probability: supplyStealProbability(pet, actor, value),
    },
    {
      target: pet.id,
      type: 'share' as const,
      probability: supplyShareProbability(actor, pet, value),
    },
  ]);
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;
  return { target: bestChoice.target, type: bestChoice.type };
};

export { distributeFood };
