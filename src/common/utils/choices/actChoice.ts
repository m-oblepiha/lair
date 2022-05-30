import type { IPet } from 'common/types';
import type { ActType } from 'redux/types';
import {
  sleepProbability,
  supplyProbability,
  attackProbability,
  healProbability,
  bullyProbability,
  caressProbability,
} from 'common/utils/rolls/actProbability';

type SleepActChoiceArgs = [actor: IPet, type: 'pets/sleep'];
type SupplyActChoiceArgs = [actor: IPet, type: 'pets/supply'];
type AttackActChoiceArgs = [actor: IPet, type: 'pets/attack', target: IPet];
type BullyActChoiceArgs = [actor: IPet, type: 'pets/bully', target: IPet];
type HealActChoiceArgs = [actor: IPet, type: 'pets/heal', target: IPet];
type CaressActChoiceArgs = [actor: IPet, type: 'pets/caress', target: IPet];

type ActChoiceArgs =
  | SleepActChoiceArgs
  | SupplyActChoiceArgs
  | AttackActChoiceArgs
  | BullyActChoiceArgs
  | HealActChoiceArgs
  | CaressActChoiceArgs;

function actChoice(...[actor, type]: SleepActChoiceArgs): {
  type: 'pets/sleep';
  probability: number;
};
function actChoice(...[actor, type]: SupplyActChoiceArgs): {
  type: 'pets/supply';
  probability: number;
};
function actChoice(...[actor, type, target]: AttackActChoiceArgs): {
  type: 'pets/attack';
  probability: number;
  target: IPet;
};
function actChoice(...[actor, type, target]: BullyActChoiceArgs): {
  type: 'pets/bully';
  probability: number;
  target: IPet;
};
function actChoice(...[actor, type, target]: HealActChoiceArgs): {
  type: 'pets/heal';
  probability: number;
  target: IPet;
};
function actChoice(...[actor, type, target]: CaressActChoiceArgs): {
  type: 'pets/caress';
  probability: number;
  target: IPet;
};
function actChoice(...[actor, type, target]: ActChoiceArgs): {
  type: ActType;
  probability: number;
  target?: IPet;
} {
  switch (type) {
    case 'pets/sleep':
      return { type, probability: sleepProbability(actor) };
    case 'pets/supply':
      return { type, probability: supplyProbability(actor) };
    case 'pets/attack':
      return { type, probability: attackProbability(actor, target), target };
    case 'pets/bully':
      return { type, probability: bullyProbability(actor, target), target };
    case 'pets/heal':
      return { type, probability: healProbability(actor, target), target };
    case 'pets/caress':
      return { type, probability: caressProbability(actor, target), target };
  }
}

export { actChoice };
