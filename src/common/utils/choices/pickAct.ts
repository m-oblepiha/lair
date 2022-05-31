import type { ID, IPet } from 'common/types';
import { sleep, supply, attack, bully, heal, caress } from 'redux/actions';
import { selectPet } from 'common/utils';
import { actValue } from 'common/utils/rolls';
import { actChoice } from './actChoice';
import { distributeFood } from './distributeFood';
import { selectBestChoice } from './selectBestChoice';

const pickAct = (actorID: ID, pets: IPet[]) => {
  const actor = selectPet(pets, actorID);
  if (!actor || actor.stats.sleep) return null;

  const otherPets = pets.filter((pet) => pet.id !== actor.id);

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

  const bestChoice =
    selectBestChoice(selfActChoices) ?? selectBestChoice(targetActChoices);

  if (!bestChoice) return null;

  switch (bestChoice.type) {
    case 'pets/sleep':
      return sleep({ actor: actor.id });
    case 'pets/supply':
      const value = actValue(actor, 'supply');
      const foodDistribution = distributeFood(otherPets, actor, value);
      switch (foodDistribution?.type) {
        case 'steal':
          return supply({
            actor: actor.id,
            value,
            distribution: {
              type: 'steal',
              target: foodDistribution.target.id,
            },
          });
        case 'share':
          return supply({
            actor: actor.id,
            value,
            distribution: {
              type: 'share',
            },
          });
        default:
          return supply({
            actor: actor.id,
            value,
          });
      }
    case 'pets/attack':
      return attack({
        actor: actor.id,
        target: bestChoice.target.id,
        value: actValue(actor, 'attack', bestChoice.target),
      });
    case 'pets/bully':
      return bully({
        actor: actor.id,
        target: bestChoice.target.id,
        value: actValue(actor, 'bully', bestChoice.target),
      });
    case 'pets/heal':
      return heal({
        actor: actor.id,
        target: bestChoice.target.id,
        value: actValue(actor, 'heal', bestChoice.target),
      });
    case 'pets/caress':
      return caress({
        actor: actor.id,
        target: bestChoice.target.id,
        value: actValue(actor, 'caress', bestChoice.target),
      });
  }
};

export { pickAct };
