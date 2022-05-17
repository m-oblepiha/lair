import type { IPet } from 'common/types';
import type { DeathInteraction } from 'common/types/interaction';
import { deathPanic } from 'redux/actions';
import { deathPanicProbability } from 'common/utils/rolls';
import { selectBestChoice } from './selectBestChoice';

const pickDeathResponse = (actor: IPet, effect: DeathInteraction) => {
  const choices = [
    {
      type: 'deathPanic' as const,
      probability: deathPanicProbability(actor, effect),
    },
  ];
  const bestChoice = selectBestChoice(choices);

  if (!bestChoice) return null;
  return deathPanic({
    actor: actor.id,
    act: effect,
  });
};

export { pickDeathResponse };
