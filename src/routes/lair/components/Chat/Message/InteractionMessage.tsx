import React from 'react';
import type {
  InteractionRecord,
  SummonInteractionRecord,
  DeathInteractionRecord,
} from 'common/types/message';
import classes from './messages.scss';

const SummonInteractionMessage: React.FC<SummonInteractionRecord> = ({
  target,
}) => {
  return <p className={classes.message}>{`В логово призван ${target}.`}</p>;
};

const DeathInteractionMessage: React.FC<DeathInteractionRecord> = ({
  target,
}) => {
  return (
    <p className={classes.message}>
      {`${target} `}
      <span className={classes.bad}>{'умирает'}</span>
      {'.'}
    </p>
  );
};

const InteractionMessage = (message: InteractionRecord) => {
  switch (message.type) {
    case 'summon':
      return <SummonInteractionMessage {...message} />;
    case 'death':
      return <DeathInteractionMessage {...message} />;
  }
};

export { InteractionMessage };
