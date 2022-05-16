import type { IPet } from 'common/types';
import type { SummonEffect, DeathEffect } from 'common/types/effect';
import { selectPet } from 'common/utils/selectPet';

const summonEffectMessage = (pets: IPet[], effect: SummonEffect) => {
  return `В логово призван ${effect.target.name}.`;
};

const deathEffectMessage = (pets: IPet[], effect: DeathEffect) => {
  const target = selectPet(pets, effect.target);
  return `${target.name} тихо скулит и, наконец, затихает...`;
};

const effectMessage = (
  pets: IPet[],
  effect: SummonEffect | DeathEffect
): string => {
  switch (effect.type) {
    case 'summon':
      return summonEffectMessage(pets, effect);
    case 'death':
      return deathEffectMessage(pets, effect);
  }
};

export { effectMessage };
