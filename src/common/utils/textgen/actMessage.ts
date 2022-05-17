import type { IPet } from 'common/types';
import type { ActAction } from 'redux/types';
import type {
  SleepAct,
  WakeupAct,
  SupplyAct,
  AttackAct,
  BullyAct,
  HealAct,
  CaressAct,
} from 'common/types/act';
import { selectPet } from 'common/utils/selectPet';

const sleepActMessage = (pets: IPet[], act: SleepAct) => {
  const actor = selectPet(pets, act.actor);
  return `${actor.name} уснул.`;
};

const wakeupActMessage = (pets: IPet[], act: WakeupAct) => {
  const actor = selectPet(pets, act.actor);
  return `${actor.name} проснулся.`;
};

const supplyActMessage = (pets: IPet[], act: SupplyAct) => {
  const actor = selectPet(pets, act.actor);
  if (act.distribution) {
    const target = selectPet(pets, act.distribution.target);
    switch (act.distribution.type) {
      case 'steal':
        return `${actor.name} добыл ${act.value} еды, но ${target.name} украл у него кусочек!`;
      case 'share':
        return `${actor.name} добыл ${act.value} еды и решил поделиться с  ${target.name}.`;
    }
  }
  return `${actor.name} добыл ${act.value} еды.`;
};

const attackActMessage = (pets: IPet[], act: AttackAct) => {
  const actor = selectPet(pets, act.actor);
  const target = selectPet(pets, act.target);
  return `${actor.name} атакует ${target.name}, нанося ${act.value} урона!`;
};

const bullyActMessage = (pets: IPet[], act: BullyAct) => {
  const actor = selectPet(pets, act.actor);
  const target = selectPet(pets, act.target);
  return `${actor.name} рычит на ${target.name}. ${target.name} теряет ${act.value} морали.`;
};

const healActMessage = (pets: IPet[], act: HealAct) => {
  const actor = selectPet(pets, act.actor);
  const target = selectPet(pets, act.target);
  return `${actor.name} зализывает раны ${target.name}, восстанавливая ему ${act.value} здоровья!`;
};

const caressActMessage = (pets: IPet[], act: CaressAct) => {
  const actor = selectPet(pets, act.actor);
  const target = selectPet(pets, act.target);
  return `${actor.name} няшкает ${target.name}. +${act.value} морали!`;
};

const actMessage = (
  pets: IPet[],
  { type, payload: act }: ActAction
): string => {
  switch (type) {
    case 'sleep':
      return sleepActMessage(pets, act);
    case 'wakeup':
      return wakeupActMessage(pets, act);
    case 'supply':
      return supplyActMessage(pets, act);
    case 'attack':
      return attackActMessage(pets, act);
    case 'bully':
      return bullyActMessage(pets, act);
    case 'heal':
      return healActMessage(pets, act);
    case 'caress':
      return caressActMessage(pets, act);
  }
};

export { actMessage };
