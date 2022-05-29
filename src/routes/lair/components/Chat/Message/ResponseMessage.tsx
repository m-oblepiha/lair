import React from 'react';
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
import classes from './messages.scss';

const WakeupCaressResponseMessage: React.FC<WakeupCaressResponse> = ({
  actor,
  act,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor.name} подходит и няшкает сонного ${act.actor.name}. `}
      <span className={classes.good}>{`+${value}`}</span>
      {` морали.`}
    </p>
  );
};

const AttackPanicResponseMessage: React.FC<AttackPanicResponse> = ({
  actor,
  act,
}) => {
  return (
    <p
      className={classes.message}
    >{`${actor.name} напуган жестокостью ${act.target.name}...`}</p>
  );
};

const AttackCounterResponseMessage: React.FC<AttackCounterResponse> = ({
  actor,
  act,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor.name} отбивается, нанося ${act.actor.name} `}
      <span className={classes.bad}>{`${value}`}</span>
      {` урона.`}
    </p>
  );
};

const AttackAvengeResponseMessage: React.FC<AttackAvengeResponse> = ({
  actor,
  act,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor.name} бросается на помощь ${act.target.name}, нанося ${act.actor.name} `}
      <span className={classes.bad}>{`${value}`}</span>
      {` урона!`}
    </p>
  );
};

const AttackJoinResponseMessage: React.FC<AttackJoinResponse> = ({
  actor,
  act,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor.name} в крысу кусает ${act.target.name} за хвост на `}
      <span className={classes.bad}>{`${value}`}</span>
      {` урона.`}
    </p>
  );
};

const BullyCounterResponseMessage: React.FC<BullyCounterResponse> = ({
  actor,
  act,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor.name} рычит в ответ, пугая ${act.actor.name} на `}
      <span className={classes.bad}>{`-${value}`}</span>
      {` морали.`}
    </p>
  );
};

const BullyAvengeResponseMessage: React.FC<BullyAvengeResponse> = ({
  actor,
  act,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor.name} издалека шугает ${act.actor.name}, заставляя того отложить `}
      <span className={classes.bad}>{`-${value}`}</span>
      {` морали.`}
    </p>
  );
};

const BullyJoinResponseMessage: React.FC<BullyJoinResponse> = ({
  actor,
  act,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor.name} громко шипит на ${act.target.name}. `}
      <span className={classes.bad}>{`-${value}`}</span>
      {` морали.`}
    </p>
  );
};

const HealDelightResponseMessage: React.FC<HealDelightResponse> = ({
  actor,
}) => {
  return <p className={classes.message}>{`${actor.name} умиляется.`}</p>;
};

const CaressCounterResponseMessage: React.FC<CaressCounterResponse> = ({
  actor,
  act,
  value,
}) => {
  return (
    <p className={classes.message}>
      {`${actor.name} резко няшкает в ответ! `}
      <span className={classes.good}>{`+${value}`}</span>
      {` морали для ${act.actor.name}.`}
    </p>
  );
};

const CaressJoinResponseMessage: React.FC<CaressJoinResponse> = ({
  actor,
  act,
}) => {
  return (
    <p
      className={classes.message}
    >{`${actor.name} няшкает ${act.target.name} вместе с ${act.actor.name}`}</p>
  );
};

const DeathPanicResponseMessage: React.FC<DeathPanicResponse> = ({ actor }) => {
  return <p className={classes.message}>{`${actor.name} в панике.`}</p>;
};

const ResponseMessage: React.FC<ResponseAction> = ({
  type,
  payload: response,
}) => {
  switch (type) {
    case 'pets/wakeupCaress':
      return <WakeupCaressResponseMessage {...response} />;
    case 'pets/attackPanic':
      return <AttackPanicResponseMessage {...response} />;
    case 'pets/attackCounter':
      return <AttackCounterResponseMessage {...response} />;
    case 'pets/attackAvenge':
      return <AttackAvengeResponseMessage {...response} />;
    case 'pets/attackJoin':
      return <AttackJoinResponseMessage {...response} />;
    case 'pets/bullyCounter':
      return <BullyCounterResponseMessage {...response} />;
    case 'pets/bullyAvenge':
      return <BullyAvengeResponseMessage {...response} />;
    case 'pets/bullyJoin':
      return <BullyJoinResponseMessage {...response} />;
    case 'pets/healDelight':
      return <HealDelightResponseMessage {...response} />;
    case 'pets/caressCounter':
      return <CaressCounterResponseMessage {...response} />;
    case 'pets/caressJoin':
      return <CaressJoinResponseMessage {...response} />;
    case 'pets/deathPanic':
      return <DeathPanicResponseMessage {...response} />;
  }
};

export { ResponseMessage };
