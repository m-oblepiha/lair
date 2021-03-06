import type { IPet } from 'common/types';
import type { AttackAct, BullyAct, CaressAct, HealAct } from 'common/types/act';
import type { ResponseType } from 'redux/types';
import {
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

const attackResponseTypes = [
  'pets/attackPanic',
  'pets/attackCounter',
  'pets/attackAvenge',
  'pets/attackJoin',
] as const;
type AttackChoiceResponseType = typeof attackResponseTypes[number];
type AttackChoiceArgs = [
  actor: IPet,
  type: AttackChoiceResponseType,
  act: AttackAct
];

const bullyResponseTypes = [
  'pets/bullyCounter',
  'pets/bullyAvenge',
  'pets/bullyJoin',
] as const;
type BullyChoiceResponseType = typeof bullyResponseTypes[number];
type BullyChoiceArgs = [
  actor: IPet,
  type: BullyChoiceResponseType,
  act: BullyAct
];

const healResponseTypes = ['pets/healDelight'] as const;
type HealChoiceResponseType = typeof healResponseTypes[number];
type HealChoiceArgs = [actor: IPet, type: HealChoiceResponseType, act: HealAct];

const caressResponseTypes = ['pets/caressCounter', 'pets/caressJoin'] as const;
type CaressChoiceResponseType = typeof caressResponseTypes[number];
type CaressChoiceArgs = [
  actor: IPet,
  type: CaressChoiceResponseType,
  act: CaressAct
];

type ResponseChoiceArgs =
  | AttackChoiceArgs
  | BullyChoiceArgs
  | HealChoiceArgs
  | CaressChoiceArgs;

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
  type: Exclude<ResponseType, 'pets/deathPanic'>;
  probability: number;
} {
  switch (type) {
    case 'pets/attackPanic':
      return {
        type,
        probability:
          actor.id === act.target ? attackPanicProbability(actor, act) : 0,
      };
    case 'pets/attackCounter':
      return {
        type,
        probability:
          actor.id === act.target ? attackCounterProbability(actor, act) : 0,
      };
    case 'pets/attackAvenge':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : attackAvengeProbability(actor, act),
      };
    case 'pets/attackJoin':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : attackJoinProbability(actor, act),
      };
    case 'pets/bullyCounter':
      return {
        type,
        probability:
          actor.id === act.target ? bullyCounterProbability(actor, act) : 0,
      };
    case 'pets/bullyAvenge':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : bullyAvengeProbability(actor, act),
      };
    case 'pets/bullyJoin':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : bullyJoinProbability(actor, act),
      };
    case 'pets/healDelight':
      return { type, probability: healDelightProbability(actor, act) };
    case 'pets/caressCounter':
      return {
        type,
        probability:
          actor.id === act.target ? caressCounterProbability(actor, act) : 0,
      };
    case 'pets/caressJoin':
      return {
        type,
        probability:
          actor.id === act.target ? 0 : caressJoinProbability(actor, act),
      };
  }
}

export {
  responseChoice,
  attackResponseTypes,
  bullyResponseTypes,
  healResponseTypes,
  caressResponseTypes,
};
