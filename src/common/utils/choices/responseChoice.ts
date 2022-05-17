import type { IPet } from 'common/types';
import type {
  AttackAct,
  BullyAct,
  CaressAct,
  HealAct,
  WakeupAct,
} from 'common/types/act';
import type { ResponseType } from 'redux/types';
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

const wakeupResponseTypes = ['wakeupCaress'] as const;
type WakeupChoiceResponseType = typeof wakeupResponseTypes[number];
type WakeupChoiceArgs = [
  actor: IPet,
  type: WakeupChoiceResponseType,
  act: WakeupAct
];

const attackResponseTypes = [
  'attackPanic',
  'attackCounter',
  'attackAvenge',
  'attackJoin',
] as const;
type AttackChoiceResponseType = typeof attackResponseTypes[number];
type AttackChoiceArgs = [
  actor: IPet,
  type: AttackChoiceResponseType,
  act: AttackAct
];

const bullyResponseTypes = [
  'bullyCounter',
  'bullyAvenge',
  'bullyJoin',
] as const;
type BullyChoiceResponseType = typeof bullyResponseTypes[number];
type BullyChoiceArgs = [
  actor: IPet,
  type: BullyChoiceResponseType,
  act: BullyAct
];

const healResponseTypes = ['healDelight'] as const;
type HealChoiceResponseType = typeof healResponseTypes[number];
type HealChoiceArgs = [actor: IPet, type: HealChoiceResponseType, act: HealAct];

const caressResponseTypes = ['caressCounter', 'caressJoin'] as const;
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
  type: Exclude<ResponseType, 'deathPanic'>;
  probability: number;
} {
  switch (type) {
    case 'wakeupCaress':
      return { type, probability: wakeupCaressProbability(actor, act) };
    case 'attackPanic':
      return {
        type,
        probability:
          actor.id === act.target ? attackPanicProbability(actor, act) : 0,
      };
    case 'attackCounter':
      return {
        type,
        probability:
          actor.id === act.target ? attackCounterProbability(actor, act) : 0,
      };
    case 'attackAvenge':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : attackAvengeProbability(actor, act),
      };
    case 'attackJoin':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : attackJoinProbability(actor, act),
      };
    case 'bullyCounter':
      return {
        type,
        probability:
          actor.id === act.target ? bullyCounterProbability(actor, act) : 0,
      };
    case 'bullyAvenge':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : bullyAvengeProbability(actor, act),
      };
    case 'bullyJoin':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : bullyJoinProbability(actor, act),
      };
    case 'healDelight':
      return { type, probability: healDelightProbability(actor, act) };
    case 'caressCounter':
      return {
        type,
        probability:
          actor.id === act.target ? caressCounterProbability(actor, act) : 0,
      };
    case 'caressJoin':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : caressJoinProbability(actor, act),
      };
  }
}

export {
  responseChoice,
  wakeupResponseTypes,
  attackResponseTypes,
  bullyResponseTypes,
  healResponseTypes,
  caressResponseTypes,
};
