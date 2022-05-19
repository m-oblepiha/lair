import type { IPet } from 'common/types';
import { clipProbability } from 'common/utils';
import { roll } from './roll';

const sleepProbability = (actor: IPet) => {
  const { fatigue } = actor.stats;

  const COEFF = { fatigueWeight: 0.5625, rollWeight: 0.05, offset: -1.125 };

  const result =
    fatigue * COEFF.fatigueWeight +
    roll(1, 10) * COEFF.rollWeight +
    COEFF.offset;

  return clipProbability(result);
};

const wakeupProbability = (actor: IPet) => {
  const { fatigue, hunger } = actor.stats;

  const COEFF = { divisor: 20 };

  const result = (hunger * roll(1, 10) - fatigue * roll(1, 10)) / COEFF.divisor;

  return clipProbability(result);
};

const supplyProbability = (actor: IPet) => {
  const { hunger } = actor.stats;

  const COEFF = { hungerWeight: 0.5625, rollWeight: 0.05, offset: -1.125 };

  const result =
    hunger * COEFF.hungerWeight + roll(1, 10) * COEFF.rollWeight + COEFF.offset;

  return clipProbability(result);
};

const attackProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: -5,
    moraleWeight: -2,
    relWeight: -5,
    rollWeight: 1,
    offset: 30,
    divisor: 10,
  };

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.moraleWeight * morale +
      COEFF.relWeight * rel +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const healProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: 5,
    moraleWeight: 2,
    relWeight: 5,
    rollWeight: 2,
    offset: -70,
    divisor: 10,
  };

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.moraleWeight * morale +
      COEFF.relWeight * rel +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const bullyProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: -5,
    moraleWeight: -2,
    relWeight: -5,
    rollWeight: 1,
    offset: 40,
    divisor: 10,
  };

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.moraleWeight * morale +
      COEFF.relWeight * rel +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const caressProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: 5,
    moraleWeight: 2,
    relWeight: 5,
    rollWeight: 2,
    offset: -50,
    divisor: 10,
  };

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.moraleWeight * morale +
      COEFF.relWeight * rel +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

export {
  sleepProbability,
  wakeupProbability,
  supplyProbability,
  attackProbability,
  healProbability,
  bullyProbability,
  caressProbability,
};
