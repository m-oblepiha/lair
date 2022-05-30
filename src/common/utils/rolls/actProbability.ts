import type { IPet } from 'common/types';
import { clipToLimit } from 'common/utils/clip';
import { roll } from './roll';

const sleepProbability = (actor: IPet) => {
  const { fatigue } = actor.stats;

  const COEFF = { fatigueWeight: 0.5625, rollWeight: 0.05, offset: -1.125 };

  const result =
    fatigue * COEFF.fatigueWeight +
    roll(1, 10) * COEFF.rollWeight +
    COEFF.offset;

  return clipToLimit(result, 0, 5);
};

const supplyProbability = (actor: IPet) => {
  const { hunger } = actor.stats;

  const COEFF = { hungerWeight: 0.5625, rollWeight: 0.05, offset: -1.125 };

  const result =
    hunger * COEFF.hungerWeight + roll(1, 10) * COEFF.rollWeight + COEFF.offset;

  return clipToLimit(result, 0, 5);
};

const attackProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: -0.5,
    moraleWeight: -0.2,
    relWeight: -1,
    rollWeight: 0.4,
    offset: 3,
  };

  const result =
    COEFF.friendlinessWeight * friendliness +
    COEFF.moraleWeight * morale +
    COEFF.relWeight * rel +
    COEFF.rollWeight * roll(1, 10) +
    COEFF.offset;

  return clipToLimit(result, 0, 4);
};

const healProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: 0.15,
    moraleWeight: 0.1,
    relWeight: 0.2,
    rollWeight: 0.2,
    offset: -2,
  };

  const result =
    COEFF.friendlinessWeight * friendliness +
    COEFF.moraleWeight * morale +
    COEFF.relWeight * rel +
    COEFF.rollWeight * roll(1, 10) +
    COEFF.offset;

  return clipToLimit(result, 0, 4);
};

const bullyProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: -0.5,
    moraleWeight: -0.2,
    relWeight: -1,
    rollWeight: 0.4,
    offset: 3,
  };

  const result =
    COEFF.friendlinessWeight * friendliness +
    COEFF.moraleWeight * morale +
    COEFF.relWeight * rel +
    COEFF.rollWeight * roll(1, 10) +
    COEFF.offset;

  return clipToLimit(result, 0, 3.5);
};

const caressProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: 0.015,
    moraleWeight: 0.1,
    relWeight: 0.1,
    rollWeight: 0.2,
  };

  const result =
    COEFF.friendlinessWeight * friendliness +
    COEFF.moraleWeight * morale +
    COEFF.relWeight * rel +
    COEFF.rollWeight * roll(1, 10);

  return clipToLimit(result, 0, 3.5);
};

export {
  sleepProbability,
  supplyProbability,
  attackProbability,
  healProbability,
  bullyProbability,
  caressProbability,
};
