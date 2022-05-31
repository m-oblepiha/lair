import type { IPet } from 'common/types';
import { clipProbability } from 'common/utils';
import { roll } from 'common/utils/rolls';
import { selectBestChoice } from './selectBestChoice';

const supplyStealProbability = (
  actor: IPet,
  target: IPet,
  foodAmount: number
) => {
  const { friendliness } = actor.attributes;
  const { morale, hunger, sleep } = actor.stats;

  const rel = actor.relations[target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: -4,
    moraleWeight: -2,
    hungerWeight: 10,
    relWeight: -10,
    rollWeight: 7.5,
    offset: -120,
    divisor: 16,
  };

  if (foodAmount < 1 || sleep) return 0;

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
  if (pets.length > 0 && roll(1, 10) > 5) return { type: 'share' as const };
  const stealChoices = pets.map((pet) => ({
    target: pet,
    probability: supplyStealProbability(pet, actor, value),
  }));
  const bestChoice = selectBestChoice(stealChoices);
  if (!bestChoice) return null;
  return { target: bestChoice.target, type: 'steal' as const };
};

export { distributeFood };
