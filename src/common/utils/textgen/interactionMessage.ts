import type { InteractionAction } from 'redux/actions/interactions';
import type {
  SummonInteraction,
  DeathInteraction,
} from 'common/types/interaction';

const summonInteractionMessage = ({ target }: SummonInteraction) => {
  return `В логово призван ${target.name}.`;
};

const deathInteractionMessage = ({ target }: DeathInteraction) => {
  return `${target.name} тихо скулит и, наконец, затихает...`;
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
