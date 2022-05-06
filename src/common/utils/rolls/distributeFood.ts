import type { IPet } from 'common/types';
import { clipProbability } from 'common/utils/calcs';
import { roll } from 'common/utils/rolls';

const supplyShareProbability = (
  actor: IPet,
  target: IPet,
  foodAmount: number
) => {
  const { friendliness } = actor.attributes;
  const { morale, hunger } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;
  const targetHunger = target.stats.hunger;
  const [a, b, c, d, e, f, g] = [4, 2, -5, 3, 10, 5, -80];
  if (foodAmount < 2) return 0;
  return clipProbability(
    (a * friendliness +
      b * morale +
      c * hunger +
      d * targetHunger +
      e * rel +
      f * roll(1, 10) +
      g) /
      14
  );
};

const supplyStealProbability = (
  actor: IPet,
  target: IPet,
  foodAmount: number
) => {
  const { friendliness } = actor.attributes;
  const { morale, hunger } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;
  const [a, b, c, d, e, f] = [-4, -2, 10, -10, 7.5, -90];
  if (foodAmount < 1) return 0;
  return clipProbability(
    (a * friendliness +
      b * morale +
      c * hunger +
      d * rel +
      e * roll(1, 10) +
      f) /
      16
  );
};

const distributeFood = (pets: IPet[], actor: IPet, value: number) => {
  const otherPets = pets.filter((pet) => pet.id !== actor.id);
  const probabilities = otherPets.flatMap((pet) => [
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
  const bestChoice = probabilities.reduce((prev, next) =>
    prev.probability > next.probability ? next : prev
  );
  return bestChoice.probability === 0
    ? null
    : { target: bestChoice.target, type: bestChoice.type };
};

export { distributeFood };
