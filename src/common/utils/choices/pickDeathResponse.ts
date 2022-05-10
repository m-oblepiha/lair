import type { IPet } from 'common/types';
import type { DeathEffect } from 'common/types/effect';
import { responses } from 'redux/slices/petsSlice';
import { deathPanicProbability } from 'common/utils/rolls';
import { selectBestChoice } from './selectBestChoice';

const pickDeathResponse = (actor: IPet, effect: DeathEffect) => {
  const choices = [
    {
      type: 'death_panic' as const,
      probability: deathPanicProbability(actor, effect),
    },
  ];
  const bestChoice = selectBestChoice(choices);

  if (!bestChoice) return null;
  return responses.death_panic({ actor: actor.id, act: effect });
};

export { pickDeathResponse };
