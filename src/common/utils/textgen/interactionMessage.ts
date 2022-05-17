import type { InteractionAction } from 'redux/actions/interactions';
import type {
  SummonInteraction,
  DeathInteraction,
} from 'common/types/interaction';

const summonEffectMessage = ({ target }: SummonInteraction) => {
  return `В логово призван ${target.name}.`;
};

const deathEffectMessage = ({ target }: DeathInteraction) => {
  return `${target.name} тихо скулит и, наконец, затихает...`;
};

const effectMessage = ({
  type,
  payload: effect,
}: InteractionAction): string => {
  switch (type) {
    case 'summon':
      return summonEffectMessage(effect);
    case 'death':
      return deathEffectMessage(effect);
  }
};

export { effectMessage };
