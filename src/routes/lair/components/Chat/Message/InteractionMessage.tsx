import React from 'react';
import type { InteractionAction } from 'redux/actions/interactions';
import type {
  SummonInteraction,
  DeathInteraction,
} from 'common/types/interaction';
import classes from './messages.scss';

const SummonInteractionMessage: React.FC<SummonInteraction> = ({ target }) => {
  return (
    <p className={classes.message}>{`В логово призван ${target.name}.`}</p>
  );
};

const DeathInteractionMessage: React.FC<DeathInteraction> = ({ target }) => {
  return (
    <p className={classes.message}>
      {`${target.name} `}
      <span className={classes.bad}>{'умирает'}</span>
      {'.'}
    </p>
  );
};

const InteractionMessage: React.FC<InteractionAction> = ({
  type,
  payload: effect,
}) => {
  switch (type) {
    case 'pets/summon':
      return <SummonInteractionMessage {...effect} />;
    case 'pets/death':
      return <DeathInteractionMessage {...effect} />;
  }
};

export { InteractionMessage };
