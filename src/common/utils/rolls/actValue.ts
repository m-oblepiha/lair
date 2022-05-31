import type { IPet } from 'common/types';
import { clipToLimit } from 'common/utils';
import { roll } from './roll';

const supplyValue = (actor: IPet) => {
  const { hunger } = actor.stats;
  const supply = actor.attributes.supply;

  const profit = Math.round(clipToLimit((supply - roll(0, 10)) / 2, 0, 5));

  return Math.min(hunger, profit);
};

const attackValue = (actor: IPet, target: IPet) => {
  if (roll(1, 1000) === 1000) return roll(1e6, 1e8);

  const health = actor.stats.health;
  const vitality = target.attributes.vitality;

  const COEFF = {
    healthWeight: 0.3,
    vitalityWeight: -0.2,
    rollWeight: 0.2,
  };

  const result =
    COEFF.healthWeight * health +
    COEFF.vitalityWeight * vitality +
    COEFF.rollWeight * roll(1, 10);

  return clipToLimit(Math.round(result), 0, 5);
};

const healValue = (actor: IPet, target: IPet) => {
  if (roll(1, 1000) === 1000) return roll(1e4, 1e6);

  const willpower = actor.attributes.willpower;
  const vitality = target.attributes.vitality;

  const COEFF = {
    willpowerWeight: 0.1,
    vitalityWeight: 0.1,
    rollWeight: 0.1,
  };

  const result =
    COEFF.willpowerWeight * willpower +
    COEFF.vitalityWeight * vitality +
    COEFF.rollWeight * roll(1, 10);

  return Math.round(result);
};

const bullyValue = (actor: IPet, target: IPet) => {
  const actorWillpower = actor.attributes.willpower;
  const targetWillpower = target.attributes.willpower;

  const COEFF = {
    actorWeight: 0.2,
    targetWeight: -0.15,
    rollWeight: 0.2,
  };

  const result =
    COEFF.actorWeight * actorWillpower +
    COEFF.targetWeight * targetWillpower +
    COEFF.rollWeight * roll(1, 10);

  return clipToLimit(Math.round(result), 0, 5);
};

const caressValue = (actor: IPet, target: IPet) => {
  const actorWillpower = actor.attributes.willpower;
  const targetWillpower = target.attributes.willpower;

  const COEFF = {
    actorWeight: 0.1,
    targetWeight: 0.1,
    rollWeight: 0.1,
  };

  const result =
    COEFF.actorWeight * actorWillpower +
    COEFF.targetWeight * targetWillpower +
    COEFF.rollWeight * roll(1, 10);

  return Math.round(result);
};

type Args =
  | [IPet, 'supply']
  | [IPet, 'attack' | 'bully' | 'heal' | 'caress', IPet];

function actValue(...[actor, type, target]: Args): number {
  switch (type) {
    case 'supply':
      return supplyValue(actor);
    case 'attack':
      return attackValue(actor, target);
    case 'bully':
      return bullyValue(actor, target);
    case 'heal':
      return healValue(actor, target);
    case 'caress':
      return caressValue(actor, target);
  }
}

export { actValue };
