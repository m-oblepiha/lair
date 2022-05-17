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

const wakeupCaressResponseMessage = ({
  actor,
  act,
  value,
}: WakeupCaressResponse) => {
  return `${actor.name} подходит поближе и няшкает сонного ${act.actor.name}. +${value} морали.`;
};

const attackPanicResponseMessage = ({ actor, act }: AttackPanicResponse) => {
  return `${actor.name} напуган жестокостью ${act.target.name}...`;
};

const attackCounterResponseMessage = ({
  actor,
  act,
  value,
}: AttackCounterResponse) => {
  return `${actor.name} отбивается, нанося ${act.actor.name} ${value} урона.`;
};

const attackAvengeResponseMessage = ({
  actor,
  act,
  value,
}: AttackAvengeResponse) => {
  return `${actor.name} бросается на помощь ${act.target.name}, нанося ${act.actor.name} ${value} урона!`;
};

const attackJoinResponseMessage = ({
  actor,
  act,
  value,
}: AttackJoinResponse) => {
  return `${actor.name} в крысу кусает ${act.target.name} за хвост на ${value} урона.`;
};

const bullyCounterResponseMessage = ({
  actor,
  act,
  value,
}: BullyCounterResponse) => {
  return `${actor.name} рычит в ответ, пугая ${act.actor.name} на -${value} морали.`;
};

const bullyAvengeResponseMessage = ({
  actor,
  act,
  value,
}: BullyAvengeResponse) => {
  return `${actor.name} издалека шугает ${act.actor.name}, заставляя того отложить -${value} морали...`;
};

const bullyJoinResponseMessage = ({ actor, act, value }: BullyJoinResponse) => {
  return `${actor.name} громко шипит, глядя ${act.target.name} в глаза, отчего тот пугается еще больше. -${value} морали.`;
};

const healDelightResponseMessage = ({ actor }: HealDelightResponse) => {
  return `${actor.name} не может сдержать слез умиления, глядя на такую благодать.`;
};

const caressCounterResponseMessage = ({
  actor,
  act,
  value,
}: CaressCounterResponse) => {
  return `${actor.name} резко няшкает в ответ! +${value} морали для ${act.actor.name}.`;
};

const caressJoinResponseMessage = ({ actor, act }: CaressJoinResponse) => {
  return `${actor.name} тоже не стоит в стороне, слегка поглаживая ${act.target.name} вместе с ${act.actor.name}`;
};

const deathPanicResponseMessage = ({ actor }: DeathPanicResponse) => {
  return `${actor.name} в шоке от его смерти...`;
};

const responseMessage = ({
  type,
  payload: response,
}: ResponseAction): string => {
  switch (type) {
    case 'wakeupCaress':
      return wakeupCaressResponseMessage(response);
    case 'attackPanic':
      return attackPanicResponseMessage(response);
    case 'attackCounter':
      return attackCounterResponseMessage(response);
    case 'attackAvenge':
      return attackAvengeResponseMessage(response);
    case 'attackJoin':
      return attackJoinResponseMessage(response);
    case 'bullyCounter':
      return bullyCounterResponseMessage(response);
    case 'bullyAvenge':
      return bullyAvengeResponseMessage(response);
    case 'bullyJoin':
      return bullyJoinResponseMessage(response);
    case 'healDelight':
      return healDelightResponseMessage(response);
    case 'caressCounter':
      return caressCounterResponseMessage(response);
    case 'caressJoin':
      return caressJoinResponseMessage(response);
    case 'deathPanic':
      return deathPanicResponseMessage(response);
  }
};

export { responseMessage };
