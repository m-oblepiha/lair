import type { IPet } from 'common/types';
import type { ActAction } from 'redux/types';
import type {
  WakeupAct,
  AttackAct,
  BullyAct,
  HealAct,
  CaressAct,
} from 'common/types/act';
import {
  wakeupCaress,
  attackPanic,
  attackCounter,
  attackAvenge,
  attackJoin,
  bullyCounter,
  bullyAvenge,
  bullyJoin,
  healDelight,
  caressCounter,
  caressJoin,
} from 'redux/actions';
import { selectPet } from 'common/utils';
import { actValue } from 'common/utils/rolls';
import {
  responseChoice,
  wakeupResponseTypes,
  attackResponseTypes,
  bullyResponseTypes,
  healResponseTypes,
  caressResponseTypes,
} from './responseChoice';
import { selectBestChoice } from './selectBestChoice';

const pickWakeupResponse = (actor: IPet, act: WakeupAct, pets: IPet[]) => {
  const choices = wakeupResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  return wakeupCaress({
    actor,
    act,
    value: actValue(actor, 'caress', selectPet(pets, act.actor.id)),
  });
};

const pickAttackResponse = (actor: IPet, act: AttackAct, pets: IPet[]) => {
  const choices = attackResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  switch (bestChoice.type) {
    case 'attackPanic':
      return attackPanic({
        actor,
        act,
      });
    case 'attackCounter':
      return attackCounter({
        actor,
        act,
        value: actValue(actor, 'attack', selectPet(pets, act.actor.id)),
      });
    case 'attackAvenge':
      return attackAvenge({
        actor,
        act,
        value: actValue(actor, 'attack', selectPet(pets, act.actor.id)),
      });
    case 'attackJoin':
      return attackJoin({
        actor,
        act,
        value: actValue(actor, 'attack', selectPet(pets, act.target.id)),
      });
  }
};

const pickBullyResponse = (actor: IPet, act: BullyAct, pets: IPet[]) => {
  const choices = bullyResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  switch (bestChoice.type) {
    case 'bullyCounter':
      return bullyCounter({
        actor,
        act,
        value: actValue(actor, 'bully', selectPet(pets, act.actor.id)),
      });
    case 'bullyAvenge':
      return bullyAvenge({
        actor,
        act,
        value: actValue(actor, 'bully', selectPet(pets, act.actor.id)),
      });
    case 'bullyJoin':
      return bullyJoin({
        actor,
        act,
        value: actValue(actor, 'bully', selectPet(pets, act.target.id)),
      });
  }
};

const pickHealResponse = (actor: IPet, act: HealAct) => {
  const choices = healResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  return healDelight({
    actor,
    act,
  });
};

const pickCaressResponse = (actor: IPet, act: CaressAct, pets: IPet[]) => {
  const choices = caressResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  switch (bestChoice.type) {
    case 'caressCounter':
      return caressCounter({
        actor,
        act,
        value: actValue(actor, 'caress', selectPet(pets, act.actor.id)),
      });
    case 'caressJoin':
      return caressJoin({
        actor,
        act,
        value: actValue(actor, 'caress', selectPet(pets, act.target.id)),
      });
  }
};

const pickResponse = (
  actor: IPet,
  { type, payload: act }: ActAction,
  pets: IPet[]
) => {
  switch (type) {
    case 'wakeup':
      return pickWakeupResponse(actor, act, pets);
    case 'attack':
      return pickAttackResponse(actor, act, pets);
    case 'bully':
      return pickBullyResponse(actor, act, pets);
    case 'heal':
      return pickHealResponse(actor, act);
    case 'caress':
      return pickCaressResponse(actor, act, pets);
    default:
      return null;
  }
};

export { pickResponse };
