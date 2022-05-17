import type { IPet } from 'common/types';
import type { InteractionAction } from 'redux/actions/interactions';
import type {
  SummonInteraction,
  DeathInteraction,
} from 'common/types/interaction';
import { selectPet } from 'common/utils/selectPet';

const summonEffectMessage = (effect: SummonInteraction) => {
  return `В логово призван ${effect.target.name}.`;
};

const deathEffectMessage = (pets: IPet[], effect: DeathInteraction) => {
  const target = selectPet(pets, effect.target);
  return `${target.name} тихо скулит и, наконец, затихает...`;
};

const effectMessage = (
  pets: IPet[],
  { type, payload: effect }: InteractionAction
): string => {
  switch (type) {
    case 'summon':
      return summonEffectMessage(effect);
    case 'death':
      return deathEffectMessage(pets, effect);
  }
};

export { effectMessage };
