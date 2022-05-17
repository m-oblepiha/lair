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

  const wakeupChoice = [actChoice(actor, 'pets/wakeup')];
  const selfActChoices = [
    actChoice(actor, 'pets/sleep'),
    actChoice(actor, 'pets/supply'),
  ];
  const targetActChoices = otherPets.flatMap((pet) => [
    actChoice(actor, 'pets/attack', pet),
    actChoice(actor, 'pets/bully', pet),
    actChoice(actor, 'pets/heal', pet),
    actChoice(actor, 'pets/caress', pet),
  ]);

  const choices = actor.stats.isAwake
    ? [...selfActChoices, ...targetActChoices]
    : wakeupChoice;

  const bestChoice = selectBestChoice(choices);
  if (!bestChoice) return null;

  switch (bestChoice.type) {
    case 'pets/sleep':
      return sleep({ actor });
    case 'pets/wakeup':
      return wakeup({ actor });
    case 'pets/supply':
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
    case 'pets/attack':
      return attack({
        actor,
        target: bestChoice.target,
        value: actValue(actor, 'attack', bestChoice.target),
      });
    case 'pets/bully':
      return bully({
        actor,
        target: bestChoice.target,
        value: actValue(actor, 'bully', bestChoice.target),
      });
    case 'pets/heal':
      return heal({
        actor,
        target: bestChoice.target,
        value: actValue(actor, 'heal', bestChoice.target),
      });
    case 'pets/caress':
      return caress({
        actor,
        target: bestChoice.target,
        value: actValue(actor, 'caress', bestChoice.target),
      });
  }
};

export { pickAct };
