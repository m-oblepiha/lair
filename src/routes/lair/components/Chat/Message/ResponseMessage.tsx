import React from 'react';
import type {
  ResponseRecord,
  AttackPanicResponseRecord,
  AttackCounterResponseRecord,
  AttackAvengeResponseRecord,
  AttackJoinResponseRecord,
  BullyCounterResponseRecord,
  BullyAvengeResponseRecord,
  BullyJoinResponseRecord,
  HealDelightResponseRecord,
  CaressCounterResponseRecord,
  CaressJoinResponseRecord,
  DeathPanicResponseRecord,
} from 'common/types/message';
import classes from './messages.scss';

const AttackPanicResponseMessage: React.FC<AttackPanicResponseRecord> = ({
  actor,
  actActor,
}) => {
  return (
    <p
      className={classes.message}
    >{`${actor} напуган жестокостью ${actActor}...`}</p>
  );
};

const AttackCounterResponseMessage: React.FC<AttackCounterResponseRecord> = ({
  actor,
  actActor,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor} отбивается, нанося ${actActor} `}
      <span className={classes.bad}>{value}</span>
      {` урона.`}
    </p>
  );
};

const AttackAvengeResponseMessage: React.FC<AttackAvengeResponseRecord> = ({
  actor,
  actActor,
  actTarget,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor} бросается на помощь ${actTarget}, нанося ${actActor} `}
      <span className={classes.bad}>{value}</span>
      {` урона!`}
    </p>
  );
};

const AttackJoinResponseMessage: React.FC<AttackJoinResponseRecord> = ({
  actor,
  actTarget,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor} в крысу кусает ${actTarget} за хвост на `}
      <span className={classes.bad}>{value}</span>
      {` урона.`}
    </p>
  );
};

const BullyCounterResponseMessage: React.FC<BullyCounterResponseRecord> = ({
  actor,
  actActor,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor} рычит в ответ, пугая ${actActor} на `}
      <span className={classes.bad}>{value}</span>
      {` морали.`}
    </p>
  );
};

const BullyAvengeResponseMessage: React.FC<BullyAvengeResponseRecord> = ({
  actor,
  actActor,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor} издалека шугает ${actActor}, заставляя того отложить `}
      <span className={classes.bad}>{value}</span>
      {` морали.`}
    </p>
  );
};

const BullyJoinResponseMessage: React.FC<BullyJoinResponseRecord> = ({
  actor,
  actTarget,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor} громко шипит на ${actTarget}. -`}
      <span className={classes.bad}>{value}</span>
      {` морали.`}
    </p>
  );
};

const HealDelightResponseMessage: React.FC<HealDelightResponseRecord> = ({
  actor,
}) => {
  return <p className={classes.message}>{`${actor} умиляется.`}</p>;
};

const CaressCounterResponseMessage: React.FC<CaressCounterResponseRecord> = ({
  actor,
  actActor,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor} резко няшкает в ответ! +`}
      <span className={classes.good}>{value}</span>
      {` морали для ${actActor}.`}
    </p>
  );
};

const CaressJoinResponseMessage: React.FC<CaressJoinResponseRecord> = ({
  actor,
  actActor,
  actTarget,
}) => {
  return (
    <p
      className={classes.message}
    >{`${actor} няшкает ${actTarget} вместе с ${actActor}`}</p>
  );
};

const DeathPanicResponseMessage: React.FC<DeathPanicResponseRecord> = ({
  actor,
}) => {
  return <p className={classes.message}>{`${actor} в панике.`}</p>;
};

const ResponseMessage = (message: ResponseRecord) => {
  switch (message.type) {
    case 'attackPanic':
      return <AttackPanicResponseMessage {...message} />;
    case 'attackCounter':
      return <AttackCounterResponseMessage {...message} />;
    case 'attackAvenge':
      return <AttackAvengeResponseMessage {...message} />;
    case 'attackJoin':
      return <AttackJoinResponseMessage {...message} />;
    case 'bullyCounter':
      return <BullyCounterResponseMessage {...message} />;
    case 'bullyAvenge':
      return <BullyAvengeResponseMessage {...message} />;
    case 'bullyJoin':
      return <BullyJoinResponseMessage {...message} />;
    case 'healDelight':
      return <HealDelightResponseMessage {...message} />;
    case 'caressCounter':
      return <CaressCounterResponseMessage {...message} />;
    case 'caressJoin':
      return <CaressJoinResponseMessage {...message} />;
    case 'deathPanic':
      return <DeathPanicResponseMessage {...message} />;
  }
};

export { ResponseMessage };
