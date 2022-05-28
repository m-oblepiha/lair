import React from 'react';
import type { InteractionAction } from 'redux/actions/interactions';
import type {
  SummonInteraction,
  DeathInteraction,
} from 'common/types/interaction';
import classes from './messages.scss';

const summonInteractionMessage = ({ target }: SummonInteraction) => {
  return `В логово призван ${target.name}.`;
};

const deathInteractionMessage = ({ target }: DeathInteraction) => {
  return `${target.name} умирает.`;
};

const interactionMessage = ({
  type,
  payload: effect,
}: InteractionAction): string => {
  switch (type) {
    case 'pets/summon':
      return summonInteractionMessage(effect);
    case 'pets/death':
      return deathInteractionMessage(effect);
  }
};

export { interactionMessage };
