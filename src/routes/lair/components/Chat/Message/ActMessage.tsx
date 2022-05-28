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

const SleepActMessage: React.FC<SleepAct> = ({ actor }) => (
  <p className={classes.message}>{`${actor.name} уснул.`}</p>
);

const WakeupActMessage: React.FC<WakeupAct> = ({ actor }) => {
  return <p className={classes.message}>{`${actor.name} проснулся.`}</p>;
};

const SupplyActMessage: React.FC<SupplyAct> = (act) => {
  const actor = act.actor;
  if (act.distribution) {
    const target = act.distribution.target;
    switch (act.distribution.type) {
      case 'steal':
        return (
          <p className={classes.message}>
            {`${actor.name} добыл `}
            <span className={classes.good}>{`${act.value}`}</span>
            {` еды, но ${target.name} `}
            <span className={classes.bad}>{'украл'}</span>
            {` у него кусочек!`}
          </p>
        );
      case 'share':
        return (
          <p className={classes.message}>
            {`${actor.name} добыл `}
            <span className={classes.good}>{`${act.value}`}</span>
            {` еды и решил `}
            <span className={classes.good}>{`поделиться`}</span>
            {` с  ${target.name}.`}
          </p>
        );
    }
  }
  return (
    <p className={classes.message}>
      {`${actor.name} добыл `}
      <span className={classes.good}>{`${act.value}`}</span>
      {` еды.`}
    </p>
  );
};

const AttackActMessage: React.FC<AttackAct> = ({ actor, target, value }) => {
  return (
    <p className={classes.message}>
      {`${actor.name} атакует ${target.name}, нанося `}
      <span className={classes.bad}>{`${value}`}</span>
      {` урона!`}
    </p>
  );
};

const BullyActMessage: React.FC<BullyAct> = ({ actor, target, value }) => {
  return (
    <p className={classes.message}>
      {`${actor.name} рычит на ${target.name}. ${target.name} теряет `}
      <span className={classes.bad}>{`${value}`}</span>
      {` морали.`}
    </p>
  );
};

const HealActMessage: React.FC<HealAct> = ({ actor, target, value }) => {
  return (
    <p className={classes.message}>
      {`${actor.name} зализывает раны ${target.name}, восстанавливая ему `}
      <span className={classes.good}>{`+${value}`}</span>
      {` здоровья!`}
    </p>
  );
};

const CaressActMessage: React.FC<CaressAct> = ({ actor, target, value }) => {
  return (
    <p className={classes.message}>
      {`${actor.name} няшкает ${target.name}. `}
      <span className={classes.good}>{`+${value}`}</span>
      {` морали!`}
    </p>
  );
};

const ActMessage: React.FC<ActAction> = ({ type, payload: act }) => {
  switch (type) {
    case 'pets/sleep':
      return <SleepActMessage {...act} />;
    case 'pets/wakeup':
      return <WakeupActMessage {...act} />;
    case 'pets/supply':
      return <SupplyActMessage {...act} />;
    case 'pets/attack':
      return <AttackActMessage {...act} />;
    case 'pets/bully':
      return <BullyActMessage {...act} />;
    case 'pets/heal':
      return <HealActMessage {...act} />;
    case 'pets/caress':
      return <CaressActMessage {...act} />;
  }
};

export { ActMessage };
