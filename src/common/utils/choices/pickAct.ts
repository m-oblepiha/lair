import type { IPet } from 'common/types';
import {
  sleep,
  wakeup,
  supply,
  attack,
  bully,
  heal,
  caress,
} from 'redux/actions';
import { actValue } from 'common/utils/rolls';
import { actChoice } from './actChoice';
import { distributeFood } from './distributeFood';
import { selectBestChoice } from './selectBestChoice';

const pickAct = (actor: IPet, pets: IPet[]) => {
  const otherPets = pets.filter((pet) => pet.id !== actor.id);

  const wakeupChoice = [actChoice(actor, 'wakeup')];
  const selfActChoices = [
    actChoice(actor, 'sleep'),
    actChoice(actor, 'supply'),
  ];
  const targetActChoices = otherPets.flatMap((pet) => [
    actChoice(actor, 'attack', pet),
    actChoice(actor, 'bully', pet),
    actChoice(actor, 'heal', pet),
    actChoice(actor, 'caress', pet),
  ]);

  const choices = actor.stats.isAwake
    ? [...selfActChoices, ...targetActChoices]
    : wakeupChoice;

  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  switch (bestChoice.type) {
    case 'sleep':
      return sleep({ actor });
    case 'wakeup':
      return wakeup({ actor });
    case 'supply':
      const foodDistribution = distributeFood(
        pets,
        actor,
        actValue(actor, 'supply')
      );
      if (foodDistribution)
        return supply({
          actor,
          value: actValue(actor, 'supply') - 1,
          distribution: {
            type: foodDistribution.type,
            target: foodDistribution.target,
          },
        });
      return supply({
        actor,
        value: actValue(actor, 'supply'),
      });
    case 'attack':
      return attack({
        actor,
        target: bestChoice.target,
        value: actValue(actor, 'attack', bestChoice.target),
      });
    case 'bully':
      return bully({
        actor,
        target: bestChoice.target,
        value: actValue(actor, 'bully', bestChoice.target),
      });
    case 'heal':
      return heal({
        actor,
        target: bestChoice.target,
        value: actValue(actor, 'heal', bestChoice.target),
      });
    case 'caress':
      return caress({
        actor,
        target: bestChoice.target,
        value: actValue(actor, 'caress', bestChoice.target),
      });
  }
};

export { pickAct };
