import type { IPet } from 'common/types';
import { roll } from './roll';

const sleepProbability = (actor: IPet) => {
  const { fatigue } = actor.stats;

  const result = fatigue > 5 && roll(0, 10) < 9;

  return +result;
};

const supplyProbability = (actor: IPet) => {
  const { hunger } = actor.stats;

  const result = hunger > 5 && roll(0, 10) < 9;

  return +result;
};

const attackProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;

  const result = morale < 8 && roll(1, 10) > friendliness;

  return +result;
};

const bullyProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;

  const result = roll(1, 10) > friendliness;

  return +result;
};

const healProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;

  const result =
    rel > 0 && roll(1, 10) === 10 && morale > 5 && friendliness > 6;

  return +result;
};

const caressProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;

  const result = friendliness > roll(1, 10) && morale > roll(1, 10);

  return +result;
};

export {
  sleepProbability,
  supplyProbability,
  attackProbability,
  healProbability,
  bullyProbability,
  caressProbability,
};
