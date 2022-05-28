import React from 'react';
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
import classes from './messages.scss';

const sleepActMessage = ({ actor }: SleepAct) => {
  return `${actor.name} уснул.`;
};

const wakeupActMessage = ({ actor }: WakeupAct) => {
  return `${actor.name} проснулся.`;
};

const supplyActMessage = (act: SupplyAct) => {
  const actor = act.actor;
  if (act.distribution) {
    const target = act.distribution.target;
    switch (act.distribution.type) {
      case 'steal':
        return `${actor.name} добыл ${act.value} еды, но ${target.name} украл у него кусочек!`;
      case 'share':
        return `${actor.name} добыл ${act.value} еды и решил поделиться с  ${target.name}.`;
    }
  }
  return `${actor.name} добыл ${act.value} еды.`;
};

const attackActMessage = ({ actor, target, value }: AttackAct) => {
  return `${actor.name} атакует ${target.name}, нанося ${value} урона!`;
};

const bullyActMessage = ({ actor, target, value }: BullyAct) => {
  return `${actor.name} рычит на ${target.name}. ${target.name} теряет ${value} морали.`;
};

const healActMessage = ({ actor, target, value }: HealAct) => {
  return `${actor.name} зализывает раны ${target.name}, восстанавливая ему ${value} здоровья!`;
};

const caressActMessage = ({ actor, target, value }: CaressAct) => {
  return `${actor.name} няшкает ${target.name}. +${value} морали!`;
};

const actMessage = ({ type, payload: act }: ActAction): string => {
  switch (type) {
    case 'pets/sleep':
      return sleepActMessage(act);
    case 'pets/wakeup':
      return wakeupActMessage(act);
    case 'pets/supply':
      return supplyActMessage(act);
    case 'pets/attack':
      return attackActMessage(act);
    case 'pets/bully':
      return bullyActMessage(act);
    case 'pets/heal':
      return healActMessage(act);
    case 'pets/caress':
      return caressActMessage(act);
  }
};

export { actMessage };
