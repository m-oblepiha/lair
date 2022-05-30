import type { IPet, ID } from 'common/types';
import type { ActAction } from 'redux/types';
import type { AttackAct, BullyAct, HealAct, CaressAct } from 'common/types/act';
import {
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
  attackResponseTypes,
  bullyResponseTypes,
  healResponseTypes,
  caressResponseTypes,
} from './responseChoice';
import { selectBestChoice } from './selectBestChoice';

const pickAttackResponse = (actor: IPet, act: AttackAct, pets: IPet[]) => {
  const choices = attackResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  const actActor = selectPet(pets, act.actor);
  const actTarget = selectPet(pets, act.target);

  if (!actActor) return null;

  switch (bestChoice.type) {
    case 'pets/attackPanic':
      return attackPanic({
        actor: actor.id,
        act,
      });
    case 'pets/attackCounter':
      return attackCounter({
        actor: actor.id,
        act,
        value: actValue(actor, 'attack', actActor),
      });
    case 'pets/attackAvenge':
      // unsafe
      return attackAvenge({
        actor: actor.id,
        act,
        value: actValue(actor, 'attack', actActor),
      });
    case 'pets/attackJoin':
      if (!actTarget) return null;
      return attackJoin({
        actor: actor.id,
        act,
        value: actValue(actor, 'attack', actTarget),
      });
  }
};

const pickBullyResponse = (actor: IPet, act: BullyAct, pets: IPet[]) => {
  const choices = bullyResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  const actActor = selectPet(pets, act.actor);
  const actTarget = selectPet(pets, act.target);

  if (!actActor || !actTarget) return null;

  switch (bestChoice.type) {
    case 'pets/bullyCounter':
      return bullyCounter({
        actor: actor.id,
        act,
        value: actValue(actor, 'bully', actActor),
      });
    case 'pets/bullyAvenge':
      return bullyAvenge({
        actor: actor.id,
        act,
        value: actValue(actor, 'bully', actActor),
      });
    case 'pets/bullyJoin':
      return bullyJoin({
        actor: actor.id,
        act,
        value: actValue(actor, 'bully', actTarget),
      });
  }
};

const pickHealResponse = (actor: IPet, act: HealAct, pets: IPet[]) => {
  const choices = healResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  const actActor = selectPet(pets, act.actor);
  const actTarget = selectPet(pets, act.target);

  if (!actActor || !actTarget) return null;

  return healDelight({
    actor: actor.id,
    act,
  });
};

const pickCaressResponse = (actor: IPet, act: CaressAct, pets: IPet[]) => {
  const choices = caressResponseTypes.map((type) =>
    responseChoice(actor, type, act)
  );
  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  const actActor = selectPet(pets, act.actor);
  const actTarget = selectPet(pets, act.target);

  if (!actActor || !actTarget) return null;

  switch (bestChoice.type) {
    case 'pets/caressCounter':
      return caressCounter({
        actor: actor.id,
        act,
        value: actValue(actor, 'caress', actActor),
      });
    case 'pets/caressJoin':
      return caressJoin({
        actor: actor.id,
        act,
        value: actValue(actor, 'caress', actTarget),
      });
  }
};

const pickResponse = (
  actorID: ID,
  { type, payload: act }: ActAction,
  pets: IPet[]
) => {
  const actor = selectPet(pets, actorID);
  if (!actor) return null;
  switch (type) {
    case 'pets/attack':
      return pickAttackResponse(actor, act, pets);
    case 'pets/bully':
      return pickBullyResponse(actor, act, pets);
    case 'pets/heal':
      return pickHealResponse(actor, act, pets);
    case 'pets/caress':
      return pickCaressResponse(actor, act, pets);
    default:
      return null;
  }
};

export { pickResponse };
