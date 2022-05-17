import type { IPet } from 'common/types';
import type { ResponseAction } from 'redux/types';
import type {
  WakeupCaressResponse,
  AttackPanicResponse,
  AttackCounterResponse,
  AttackAvengeResponse,
  AttackJoinResponse,
  BullyCounterResponse,
  BullyAvengeResponse,
  BullyJoinResponse,
  HealDelightResponse,
  CaressCounterResponse,
  CaressJoinResponse,
  DeathPanicResponse,
} from 'common/types/response';
import { selectPet } from 'common/utils/selectPet';

const wakeupCaressResponseMessage = (
  pets: IPet[],
  response: WakeupCaressResponse
) => {
  const actor = selectPet(pets, response.actor);
  const actActor = selectPet(pets, response.act.actor);
  return `${actor.name} подходит поближе и няшкает сонного ${actActor.name}. +${response.value} морали.`;
};

const attackPanicResponseMessage = (
  pets: IPet[],
  response: AttackPanicResponse
) => {
  const actor = selectPet(pets, response.actor);
  const actTarget = selectPet(pets, response.act.target);
  return `${actor.name} напуган жестокостью ${actTarget.name}...`;
};

const attackCounterResponseMessage = (
  pets: IPet[],
  response: AttackCounterResponse
) => {
  const actor = selectPet(pets, response.actor);
  const actActor = selectPet(pets, response.act.actor);
  return `${actor.name} отбивается, нанося ${actActor.name} ${response.value} урона.`;
};

const attackAvengeResponseMessage = (
  pets: IPet[],
  response: AttackAvengeResponse
) => {
  const actor = selectPet(pets, response.actor);
  const actActor = selectPet(pets, response.act.actor);
  const actTarget = selectPet(pets, response.act.target);
  return `${actor.name} бросается на помощь ${actTarget.name}, нанося ${actActor.name} ${response.value} урона!`;
};

const attackJoinResponseMessage = (
  pets: IPet[],
  response: AttackJoinResponse
) => {
  const actor = selectPet(pets, response.actor);
  const actTarget = selectPet(pets, response.act.target);
  return `${actor.name} в крысу кусает ${actTarget.name} за хвост на ${response.value} урона.`;
};

const bullyCounterResponseMessage = (
  pets: IPet[],
  response: BullyCounterResponse
) => {
  const actor = selectPet(pets, response.actor);
  const actActor = selectPet(pets, response.act.actor);
  return `${actor.name} рычит в ответ, пугая ${actActor.name} на -${response.value} морали.`;
};

const bullyAvengeResponseMessage = (
  pets: IPet[],
  response: BullyAvengeResponse
) => {
  const actor = selectPet(pets, response.actor);
  const actActor = selectPet(pets, response.act.actor);
  return `${actor.name} издалека шугает ${actActor.name}, заставляя того отложить -${response.value} морали...`;
};

const bullyJoinResponseMessage = (
  pets: IPet[],
  response: BullyJoinResponse
) => {
  const actor = selectPet(pets, response.actor);
  const actTarget = selectPet(pets, response.act.target);
  return `${actor.name} громко шипит, глядя ${actTarget.name} в глаза, отчего тот пугается еще больше. -${response.value} морали.`;
};

const healDelightResponseMessage = (
  pets: IPet[],
  response: HealDelightResponse
) => {
  const actor = selectPet(pets, response.actor);
  return `${actor.name} не может сдержать слез умиления, глядя на такую благодать.`;
};

const caressCounterResponseMessage = (
  pets: IPet[],
  response: CaressCounterResponse
) => {
  const actor = selectPet(pets, response.actor);
  const actActor = selectPet(pets, response.act.actor);
  return `${actor.name} резко няшкает в ответ! +${response.value} морали для ${actActor.name}.`;
};

const caressJoinResponseMessage = (
  pets: IPet[],
  response: CaressJoinResponse
) => {
  const actor = selectPet(pets, response.actor);
  const actActor = selectPet(pets, response.act.actor);
  const actTarget = selectPet(pets, response.act.target);
  return `${actor.name} тоже не стоит в стороне, слегка поглаживая ${actTarget.name} вместе с ${actActor.name}`;
};

const deathPanicResponseMessage = (
  pets: IPet[],
  response: DeathPanicResponse
) => {
  const actor = selectPet(pets, response.actor);
  return `${actor.name} в шоке от его смерти...`;
};

const responseMessage = (
  pets: IPet[],
  { type, payload: response }: ResponseAction
): string => {
  switch (type) {
    case 'wakeupCaress':
      return wakeupCaressResponseMessage(pets, response);
    case 'attackPanic':
      return attackPanicResponseMessage(pets, response);
    case 'attackCounter':
      return attackCounterResponseMessage(pets, response);
    case 'attackAvenge':
      return attackAvengeResponseMessage(pets, response);
    case 'attackJoin':
      return attackJoinResponseMessage(pets, response);
    case 'bullyCounter':
      return bullyCounterResponseMessage(pets, response);
    case 'bullyAvenge':
      return bullyAvengeResponseMessage(pets, response);
    case 'bullyJoin':
      return bullyJoinResponseMessage(pets, response);
    case 'healDelight':
      return healDelightResponseMessage(pets, response);
    case 'caressCounter':
      return caressCounterResponseMessage(pets, response);
    case 'caressJoin':
      return caressJoinResponseMessage(pets, response);
    case 'deathPanic':
      return deathPanicResponseMessage(pets, response);
  }
};

export { responseMessage };
