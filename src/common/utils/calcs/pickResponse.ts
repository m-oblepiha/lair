import type { IPet } from 'common/types';
import type {
  Act,
  WakeupAct,
  AttackAct,
  BullyAct,
  HealAct,
  CaressAct,
} from 'common/types/act';
import { ResponseType } from 'common/types/response';
import type { DeathEffect } from 'common/types/effect';
import { responses } from 'redux/slices/petsSlice';
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
  deathPanicProbability,
  actValue,
} from 'common/utils/rolls';
import { selectBestChoice } from './selectBestChoice';

const pickWakeupResponse = (
  actor: IPet,
  act: WakeupAct,
  pets: IPet[]
): ReturnType<typeof responses['wakeup_caress']> | null => {
  const choices = [
    {
      type: 'wakeup_caress' as const,
      probability:
        actor.id === act.actor ? 0 : wakeupCaressProbability(actor, act),
    },
  ];
  const bestChoice = selectBestChoice(choices);

  if (!bestChoice) return null;

  return responses.wakeup_caress({
    actor: actor.id,
    act,
    value: actValue(
      'caress',
      actor,
      pets.find((pet) => pet.id === act.actor)
    ),
  });
};

const pickAttackResponse = (
  actor: IPet,
  act: AttackAct,
  pets: IPet[]
): ReturnType<
  typeof responses[
    | 'attack_panic'
    | 'attack_counter'
    | 'attack_avenge'
    | 'attack_join']
> | null => {
  const choices = [
    {
      type: 'attack_panic' as const,
      probability:
        actor.id === act.actor ? attackPanicProbability(actor, act) : 0,
    },
    {
      type: 'attack_counter' as const,
      probability:
        actor.id === act.actor ? attackCounterProbability(actor, act) : 0,
    },
    {
      type: 'attack_avenge' as const,
      probability:
        actor.id === act.actor ? 0 : attackAvengeProbability(actor, act),
    },
    {
      type: 'attack_join' as const,
      probability:
        actor.id === act.actor ? 0 : attackJoinProbability(actor, act),
    },
  ];
  const bestChoice = selectBestChoice(choices);

  if (!bestChoice) return null;

  return {
    attack_panic: responses.attack_panic({ actor: actor.id, act }),
    attack_counter: responses.attack_counter({
      actor: actor.id,
      act,
      value: actValue(
        'attack',
        actor,
        pets.find((pet) => pet.id === act.actor)
      ),
    }),
    attack_avenge: responses.attack_avenge({
      actor: actor.id,
      act,
      value: actValue(
        'attack',
        actor,
        pets.find((pet) => pet.id === act.actor)
      ),
    }),
    attack_join: responses.attack_join({
      actor: actor.id,
      act,
      value: actValue(
        'attack',
        actor,
        pets.find((pet) => pet.id === act.target)
      ),
    }),
  }[bestChoice.type];
};

const pickBullyResponse = (
  actor: IPet,
  act: BullyAct,
  pets: IPet[]
): ReturnType<
  typeof responses['bully_counter' | 'bully_avenge' | 'bully_join']
> | null => {
  const choices = [
    {
      type: 'bully_counter' as const,
      probability:
        actor.id === act.actor ? bullyCounterProbability(actor, act) : 0,
    },
    {
      type: 'bully_avenge' as const,
      probability:
        actor.id === act.actor ? 0 : bullyAvengeProbability(actor, act),
    },
    {
      type: 'bully_join' as const,
      probability:
        actor.id === act.actor ? 0 : bullyJoinProbability(actor, act),
    },
  ];
  const bestChoice = selectBestChoice(choices);

  if (!bestChoice) return null;
  return {
    bully_counter: responses.bully_counter({
      actor: actor.id,
      act,
      value: actValue(
        'bully',
        actor,
        pets.find((pet) => pet.id === act.actor)
      ),
    }),
    bully_avenge: responses.bully_avenge({
      actor: actor.id,
      act,
      value: actValue(
        'bully',
        actor,
        pets.find((pet) => pet.id === act.actor)
      ),
    }),
    bully_join: responses.bully_join({
      actor: actor.id,
      act,
      value: actValue(
        'bully',
        actor,
        pets.find((pet) => pet.id === act.target)
      ),
    }),
  }[bestChoice.type];
};

const pickHealResponse = (
  actor: IPet,
  act: HealAct,
  pets: IPet[]
): ReturnType<typeof responses['heal_delight']> | null => {
  const choices = [
    {
      type: 'heal_delight' as const,
      probability: healDelightProbability(actor, act),
    },
  ];
  const bestChoice = selectBestChoice(choices);

  if (!bestChoice) return null;

  return responses.heal_delight({
    actor: actor.id,
    act,
  });
};

const pickCaressResponse = (
  actor: IPet,
  act: CaressAct,
  pets: IPet[]
): ReturnType<typeof responses['caress_counter' | 'caress_join']> | null => {
  const choices = [
    {
      type: 'caress_counter' as const,
      probability:
        actor.id === act.actor ? caressCounterProbability(actor, act) : 0,
    },
    {
      type: 'caress_join' as const,
      probability:
        actor.id === act.actor ? 0 : caressJoinProbability(actor, act),
    },
  ];
  const bestChoice = selectBestChoice(choices);

  if (!bestChoice) return null;
  return {
    caress_counter: responses.caress_counter({
      actor: actor.id,
      act,
      value: actValue(
        'caress',
        actor,
        pets.find((pet) => pet.id === act.actor)
      ),
    }),
    caress_join: responses.caress_join({
      actor: actor.id,
      act,
      value: actValue(
        'caress',
        actor,
        pets.find((pet) => pet.id === act.target)
      ),
    }),
  }[bestChoice.type];
};

const pickResponse = (
  actor: IPet,
  act: Act,
  pets: IPet[]
): ReturnType<typeof responses[ResponseType]> | null => {
  switch (act.type) {
    case 'wakeup':
      return pickWakeupResponse(actor, act, pets);
    case 'attack':
      return pickAttackResponse(actor, act, pets);
    case 'bully':
      return pickBullyResponse(actor, act, pets);
    case 'heal':
      return pickHealResponse(actor, act, pets);
    case 'caress':
      return pickCaressResponse(actor, act, pets);
    default:
      return null;
  }
};

const pickDeathResponse = (actor: IPet, effect: DeathEffect) => {
  const choices = [
    {
      type: 'death_panic' as const,
      probability: deathPanicProbability(actor, effect),
    },
  ];
  const bestChoice = selectBestChoice(choices);

  if (!bestChoice) return null;
  return responses.death_panic({ actor: actor.id, act: effect });
};

export { pickResponse, pickDeathResponse };
