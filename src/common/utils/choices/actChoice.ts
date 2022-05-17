import type { IPet } from 'common/types';
import type { ActType } from 'redux/types';
import {
  sleepProbability,
  wakeupProbability,
  supplyProbability,
  attackProbability,
  healProbability,
  bullyProbability,
  caressProbability,
} from 'common/utils/rolls/actProbability';

type SleepActChoiceArgs = [actor: IPet, type: 'sleep'];
type WakeupActChoiceArgs = [actor: IPet, type: 'wakeup'];
type SupplyActChoiceArgs = [actor: IPet, type: 'supply'];
type AttackActChoiceArgs = [actor: IPet, type: 'attack', target: IPet];
type BullyActChoiceArgs = [actor: IPet, type: 'bully', target: IPet];
type HealActChoiceArgs = [actor: IPet, type: 'heal', target: IPet];
type CaressActChoiceArgs = [actor: IPet, type: 'caress', target: IPet];

type ActChoiceArgs =
  | SleepActChoiceArgs
  | WakeupActChoiceArgs
  | SupplyActChoiceArgs
  | AttackActChoiceArgs
  | BullyActChoiceArgs
  | HealActChoiceArgs
  | CaressActChoiceArgs;

function actChoice(...[actor, type]: SleepActChoiceArgs): {
  type: 'sleep';
  probability: number;
};
function actChoice(...[actor, type]: WakeupActChoiceArgs): {
  type: 'wakeup';
  probability: number;
};
function actChoice(...[actor, type]: SupplyActChoiceArgs): {
  type: 'supply';
  probability: number;
};
function actChoice(...[actor, type, target]: AttackActChoiceArgs): {
  type: 'attack';
  probability: number;
  target: IPet;
};
function actChoice(...[actor, type, target]: BullyActChoiceArgs): {
  type: 'bully';
  probability: number;
  target: IPet;
};
function actChoice(...[actor, type, target]: HealActChoiceArgs): {
  type: 'heal';
  probability: number;
  target: IPet;
};
function actChoice(...[actor, type, target]: CaressActChoiceArgs): {
  type: 'caress';
  probability: number;
  target: IPet;
};
function actChoice(...[actor, type, target]: ActChoiceArgs): {
  type: ActType;
  probability: number;
  target?: IPet;
} {
  switch (type) {
    case 'sleep':
      return { type, probability: sleepProbability(actor) };
    case 'wakeup':
      return { type, probability: wakeupProbability(actor) };
    case 'supply':
      return { type, probability: supplyProbability(actor) };
    case 'attack':
      return { type, probability: attackProbability(actor, target), target };
    case 'bully':
      return { type, probability: bullyProbability(actor, target), target };
    case 'heal':
      return { type, probability: healProbability(actor, target), target };
    case 'caress':
      return { type, probability: caressProbability(actor, target), target };
  }
}

export { actChoice };
