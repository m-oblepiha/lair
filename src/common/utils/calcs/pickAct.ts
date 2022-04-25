import type { IPet, ActType } from 'common/types';
import {
  sleepProbability,
  wakeupProbability,
  supplyProbability,
  attackProbability,
  healProbability,
  bullyProbability,
  caressProbability,
  actValue,
} from 'common/utils/rolls';
import { acts } from 'redux/slices/petsSlice';
import { distributeFood } from 'common/utils/rolls/distributeFood';

type Choice = { target?: IPet; type: ActType; probability: number };

const pickAct = (actor: IPet, pets: IPet[]) => {
  const otherPets = pets.filter((pet) => pet.id !== actor.id);

  let choices: Choice[] = [];

  if (!actor.stats.isAwake)
    choices = [{ type: 'wakeup', probability: wakeupProbability(actor) }];
  else {
    const selfActChoices: Choice[] = [
      { type: 'sleep', probability: sleepProbability(actor) },
      { type: 'supply', probability: supplyProbability(actor) },
    ];
    const actChoices: Choice[] = otherPets.flatMap((pet) => [
      {
        target: pet,
        type: 'attack',
        probability: attackProbability(actor, pet),
      },
      {
        target: pet,
        type: 'bully',
        probability: bullyProbability(actor, pet),
      },
      {
        target: pet,
        type: 'caress',
        probability: caressProbability(actor, pet),
      },
      {
        target: pet,
        type: 'heal',
        probability: healProbability(actor, pet),
      },
    ]);
    choices = selfActChoices.concat(actChoices);
  }

  const realChoices = choices.filter((choice) => choice.probability > 0);
  if (realChoices.length === 0) return null;

  const bestChoice = choices.reduce((prev, next) =>
    prev.probability > next.probability ? next : prev
  );

  if (bestChoice.type === 'sleep') return acts.sleep({ actor: actor.id });
  if (bestChoice.type === 'wakeup') return acts.wakeup({ actor: actor.id });

  const value = actValue(bestChoice.type, actor, bestChoice.target);

  if (bestChoice.type === 'supply') {
    const foodDistribution = distributeFood(pets, actor, value);
    if (foodDistribution)
      return acts.supply({
        actor: actor.id,
        value: value - 1,
        distribution: {
          type: foodDistribution.type,
          target: foodDistribution.target,
        },
      });
    else return acts.supply({ actor: actor.id, value: value });
  }

  return acts[bestChoice.type]({
    actor: actor.id,
    target: (bestChoice.target as IPet).id,
    value: value,
  });
};

export { pickAct };
