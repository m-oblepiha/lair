import type { IPet } from 'common/types';
import type {
  AttackAct,
  BullyAct,
  CaressAct,
  HealAct,
  WakeupAct,
} from 'common/types/act';
import type { ResponseType } from 'common/types/response';
import {
  wakeupCaressProbability,
  attackCounterProbability,
  attackPanicProbability,
  attackAvengeProbability,
  attackJoinProbability,
  healDelightProbability,
  bullyAvengeProbability,
  bullyCounterProbability,
  bullyJoinProbability,
  caressCounterProbability,
  caressJoinProbability,
} from 'common/utils/rolls/responseProbability';

const wakeupResponseTypes = ['wakeup_caress'] as const;
type WakeupChoiceResponseType = typeof wakeupResponseTypes[number];
type WakeupChoiceArgs = [
  actor: IPet,
  type: WakeupChoiceResponseType,
  act: WakeupAct
];

const attackResponseTypes = [
  'attack_panic',
  'attack_counter',
  'attack_avenge',
  'attack_join',
] as const;
type AttackChoiceResponseType = typeof attackResponseTypes[number];
type AttackChoiceArgs = [
  actor: IPet,
  type: AttackChoiceResponseType,
  act: AttackAct
];

const bullyResponseTypes = [
  'bully_counter',
  'bully_avenge',
  'bully_join',
] as const;
type BullyChoiceResponseType = typeof bullyResponseTypes[number];
type BullyChoiceArgs = [
  actor: IPet,
  type: BullyChoiceResponseType,
  act: BullyAct
];

const healResponseTypes = ['heal_delight'] as const;
type HealChoiceResponseType = typeof healResponseTypes[number];
type HealChoiceArgs = [actor: IPet, type: HealChoiceResponseType, act: HealAct];

const caressResponseTypes = ['caress_counter', 'caress_join'] as const;
type CaressChoiceResponseType = typeof caressResponseTypes[number];
type CaressChoiceArgs = [
  actor: IPet,
  type: CaressChoiceResponseType,
  act: CaressAct
];

type ResponseChoiceArgs =
  | WakeupChoiceArgs
  | AttackChoiceArgs
  | BullyChoiceArgs
  | HealChoiceArgs
  | CaressChoiceArgs;

function responseChoice(...[actor, type, act]: WakeupChoiceArgs): {
  type: WakeupChoiceResponseType;
  probability: number;
};
function responseChoice(...[actor, type, act]: AttackChoiceArgs): {
  type: AttackChoiceResponseType;
  probability: number;
};
function responseChoice(...[actor, type, act]: BullyChoiceArgs): {
  type: BullyChoiceResponseType;
  probability: number;
};
function responseChoice(...[actor, type, act]: HealChoiceArgs): {
  type: HealChoiceResponseType;
  probability: number;
};
function responseChoice(...[actor, type, act]: CaressChoiceArgs): {
  type: CaressChoiceResponseType;
  probability: number;
};
function responseChoice(...[actor, type, act]: ResponseChoiceArgs): {
  type: Exclude<ResponseType, 'death_panic'>;
  probability: number;
} {
  switch (type) {
    case 'wakeup_caress':
      return { type, probability: wakeupCaressProbability(actor, act) };
    case 'attack_panic':
      return {
        type,
        probability:
          actor.id === act.target ? attackPanicProbability(actor, act) : 0,
      };
    case 'attack_counter':
      return {
        type,
        probability:
          actor.id === act.target ? attackCounterProbability(actor, act) : 0,
      };
    case 'attack_avenge':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : attackAvengeProbability(actor, act),
      };
    case 'attack_join':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : attackJoinProbability(actor, act),
      };
    case 'bully_counter':
      return {
        type,
        probability:
          actor.id === act.target ? bullyCounterProbability(actor, act) : 0,
      };
    case 'bully_avenge':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : bullyAvengeProbability(actor, act),
      };
    case 'bully_join':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : bullyJoinProbability(actor, act),
      };
    case 'heal_delight':
      return { type, probability: healDelightProbability(actor, act) };
    case 'caress_counter':
      return {
        type,
        probability:
          actor.id === act.target ? caressCounterProbability(actor, act) : 0,
      };
    case 'caress_join':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : caressJoinProbability(actor, act),
      };
  }
}

export type {
  WakeupChoiceResponseType,
  AttackChoiceResponseType,
  BullyChoiceResponseType,
  HealChoiceResponseType,
  CaressChoiceResponseType,
};
export {
  responseChoice,
  wakeupResponseTypes,
  attackResponseTypes,
  bullyResponseTypes,
  healResponseTypes,
  caressResponseTypes,
};
