import type { IPet } from 'common/types';
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

  const result =
    foodAmount > 1 &&
    !sleep &&
    rel < 1 &&
    morale < 7 &&
    hunger > 6 &&
    friendliness < 9 &&
    roll(1, 10) > 6;

  return +result;
};

const distributeFood = (pets: IPet[], actor: IPet, value: number) => {
  if (pets.length > 0 && roll(1, 10) > 3) return { type: 'share' as const };
  const stealChoices = pets.map((pet) => ({
    target: pet,
    probability: supplyStealProbability(pet, actor, value),
  }));
  const bestChoice = selectBestChoice(stealChoices);
  if (!bestChoice) return null;
  return { target: bestChoice.target, type: 'steal' as const };
};

export { distributeFood };
