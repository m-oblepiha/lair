import type { IPet } from 'common/types';
import { roll } from './roll';

const supplyValue = (actor: IPet) => {
  const { health, hunger } = actor.stats;
  const supply = actor.attributes.vitality;
  const profit = roll(1, 10) * ((10 + health) / 20) * (supply / (10 + supply));
  return Math.min(hunger, Math.round(profit));
};

const attackValue = (actor: IPet, target: IPet) => {
  if (roll(1, 1000) === 1000) return roll(1e6, 1e8);
  const health = actor.stats.health;
  const vitality = target.attributes.vitality;
  const damage = roll(1, 10) * (health / (8 + vitality)) * (1 / 2);
  return Math.round(damage);
};

const healValue = (actor: IPet, target: IPet) => {
  if (roll(1, 1000) === 1000) return roll(1e4, 1e6);
  const willpower = actor.attributes.willpower;
  const vitality = target.attributes.vitality;
  const regen = roll(1, 10) * (willpower / 10) * (vitality / 10) * (1 / 3);
  return Math.round(regen);
};

const bullyValue = (actor: IPet, target: IPet) => {
  const morale = actor.stats.morale;
  const willpower = target.attributes.willpower;
  const damage = roll(1, 10) * (morale / (8 + willpower)) * (1 / 2);
  return Math.round(damage);
};

const caressValue = (actor: IPet, target: IPet) => {
  const morale = actor.stats.morale;
  const willpower = target.attributes.willpower;
  const regen = roll(1, 10) * (morale / 10) * (willpower / 10) * (2 / 3);
  return Math.round(regen);
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
