import React from 'react';
import type {
  ActRecord,
  SleepActRecord,
  SupplyActRecord,
  AttackActRecord,
  BullyActRecord,
  HealActRecord,
  CaressActRecord,
} from 'common/types/message';
import classes from './messages.scss';

const SleepActMessage: React.FC<SleepActRecord> = ({ actor }) => {
  return <p className={classes.message}>{`${actor} уснул.`}</p>;
};

const SupplyActMessage: React.FC<SupplyActRecord> = ({
  actor,
  value,
  distribution,
}) => {
  if (value === 0) return null;

  switch (distribution?.type) {
    case 'steal':
      return (
        <p className={classes.message}>
          {`${actor} добыл `}
          <span className={classes.good}>{value}</span>
          {` еды, но ${distribution.target} `}
          <span className={classes.bad}>{'украл'}</span>
          {` у него кусочек!`}
        </p>
      );
    case 'share':
      return (
        <p className={classes.message}>
          {`${actor} добыл `}
          <span className={classes.good}>{value}</span>
          {` еды `}
          <span className={classes.good}>{`для всех`}</span>
          {`.`}
        </p>
      );
    default:
      return (
        <p className={classes.message}>
          {`${actor} добыл `}
          <span className={classes.good}>{value}</span>
          {` еды.`}
        </p>
      );
  }
};

const AttackActMessage: React.FC<AttackActRecord> = ({
  actor,
  target,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor} атакует ${target}, нанося `}
      <span className={classes.bad}>{value}</span>
      {` урона!`}
    </p>
  );
};

const BullyActMessage: React.FC<BullyActRecord> = ({
  actor,
  target,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor} рычит на ${target}. ${target} теряет `}
      <span className={classes.bad}>{value}</span>
      {` морали.`}
    </p>
  );
};

const HealActMessage: React.FC<HealActRecord> = ({ actor, target, value }) => {
  return (
    <p className={classes.message}>
      {`${actor} зализывает раны ${target}, восстанавливая ему `}
      <span className={classes.good}>{value}</span>
      {` здоровья!`}
    </p>
  );
};

const CaressActMessage: React.FC<CaressActRecord> = ({
  actor,
  target,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor} няшкает ${target}. +`}
      <span className={classes.good}>{value}</span>
      {` морали!`}
    </p>
  );
};

const ActMessage = (message: ActRecord) => {
  switch (message.type) {
    case 'sleep':
      return <SleepActMessage {...message} />;
    case 'supply':
      return <SupplyActMessage {...message} />;
    case 'attack':
      return <AttackActMessage {...message} />;
    case 'bully':
      return <BullyActMessage {...message} />;
    case 'heal':
      return <HealActMessage {...message} />;
    case 'caress':
      return <CaressActMessage {...message} />;
  }
};

export { ActMessage };
