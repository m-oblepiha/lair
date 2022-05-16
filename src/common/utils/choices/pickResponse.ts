import type { IPet } from 'common/types';
import type {
  Act,
  WakeupAct,
  AttackAct,
  BullyAct,
  HealAct,
  CaressAct,
} from 'common/types/act';
import type { ResponseType } from 'common/types/response';
import { responses } from 'redux/slices/petsSlice';
import { selectPet } from 'common/utils';
import { actValue } from 'common/utils/rolls';
import {
  responseChoice,
  wakeupResponseTypes,
  attackResponseTypes,
  bullyResponseTypes,
  healResponseTypes,
  caressResponseTypes,
  type WakeupChoiceResponseType,
  type AttackChoiceResponseType,
  type BullyChoiceResponseType,
  type HealChoiceResponseType,
  type CaressChoiceResponseType,
} from './responseChoice';
import { selectBestChoice } from './selectBestChoice';

const pickWakeupResponse = (
  actor: IPet,
  act: WakeupAct,
  pets: IPet[]
): ReturnType<typeof responses[WakeupChoiceResponseType]> | null => {
  const choices = wakeupResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  return responses.wakeup_caress({
    type: 'wakeup_caress',
    actor: actor.id,
    act,
    value: actValue(actor, 'caress', selectPet(pets, act.actor)),
  });
};

const pickAttackResponse = (
  actor: IPet,
  act: AttackAct,
  pets: IPet[]
): ReturnType<typeof responses[AttackChoiceResponseType]> | null => {
  const choices = attackResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  switch (bestChoice.type) {
    case 'attack_panic':
      return responses.attack_panic({
        type: 'attack_panic',
        actor: actor.id,
        act,
      });
    case 'attack_counter':
      return responses.attack_counter({
        type: 'attack_counter',
        actor: actor.id,
        act,
        value: actValue(actor, 'attack', selectPet(pets, act.actor)),
      });
    case 'attack_avenge':
      return responses.attack_avenge({
        type: 'attack_avenge',
        actor: actor.id,
        act,
        value: actValue(actor, 'attack', selectPet(pets, act.actor)),
      });
    case 'attack_join':
      return responses.attack_join({
        type: 'attack_join',
        actor: actor.id,
        act,
        value: actValue(actor, 'attack', selectPet(pets, act.target)),
      });
  }
};

const pickBullyResponse = (
  actor: IPet,
  act: BullyAct,
  pets: IPet[]
): ReturnType<typeof responses[BullyChoiceResponseType]> | null => {
  const choices = bullyResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  switch (bestChoice.type) {
    case 'bully_counter':
      return responses.bully_counter({
        type: 'bully_counter',
        actor: actor.id,
        act,
        value: actValue(actor, 'bully', selectPet(pets, act.actor)),
      });
    case 'bully_avenge':
      return responses.bully_avenge({
        type: 'bully_avenge',
        actor: actor.id,
        act,
        value: actValue(actor, 'bully', selectPet(pets, act.actor)),
      });
    case 'bully_join':
      return responses.bully_join({
        type: 'bully_join',
        actor: actor.id,
        act,
        value: actValue(actor, 'bully', selectPet(pets, act.target)),
      });
  }
};

const pickHealResponse = (
  actor: IPet,
  act: HealAct,
  pets: IPet[]
): ReturnType<typeof responses[HealChoiceResponseType]> | null => {
  const choices = healResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  return responses.heal_delight({
    type: 'heal_delight',
    actor: actor.id,
    act,
  });
};

const pickCaressResponse = (
  actor: IPet,
  act: CaressAct,
  pets: IPet[]
): ReturnType<typeof responses[CaressChoiceResponseType]> | null => {
  const choices = caressResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  switch (bestChoice.type) {
    case 'caress_counter':
      return responses.caress_counter({
        type: 'caress_counter',
        actor: actor.id,
        act,
        value: actValue(actor, 'caress', selectPet(pets, act.actor)),
      });
    case 'caress_join':
      return responses.caress_join({
        type: 'caress_join',
        actor: actor.id,
        act,
        value: actValue(actor, 'caress', selectPet(pets, act.target)),
      });
  }
};

const pickResponse = (
  actor: IPet,
  act: Act,
  pets: IPet[]
): ReturnType<
  typeof responses[Exclude<ResponseType, 'death_panic'>]
> | null => {
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

export { pickResponse };
