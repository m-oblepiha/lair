import type { IPet } from 'common/types';
import type { ActRecord } from 'common/types/message';
import type { ActAction } from 'redux/types';
import { unsafeSelectPet } from 'common/utils';

const transformActMessage = (
  pets: IPet[],
  { payload, type }: ActAction
): ActRecord => {
  switch (type) {
    case 'pets/sleep':
      return {
        type: 'sleep',
        actor: unsafeSelectPet(pets, payload.actor).name,
      };
    case 'pets/supply':
      return {
        type: 'supply',
        actor: unsafeSelectPet(pets, payload.actor).name,
        value: payload.value,
        distribution:
          payload.distribution?.type === 'steal'
            ? {
                type: 'steal',
                target: unsafeSelectPet(pets, payload.distribution.target).name,
              }
            : payload.distribution?.type === 'share'
            ? { type: 'share' }
            : undefined,
      };
    case 'pets/attack':
      return {
        type: 'attack',
        actor: unsafeSelectPet(pets, payload.actor).name,
        target: unsafeSelectPet(pets, payload.target).name,
        value: payload.value,
      };
    case 'pets/bully':
      return {
        type: 'bully',
        actor: unsafeSelectPet(pets, payload.actor).name,
        target: unsafeSelectPet(pets, payload.target).name,
        value: payload.value,
      };
    case 'pets/caress':
      return {
        type: 'caress',
        actor: unsafeSelectPet(pets, payload.actor).name,
        target: unsafeSelectPet(pets, payload.target).name,
        value: payload.value,
      };
    case 'pets/heal':
      return {
        type: 'heal',
        actor: unsafeSelectPet(pets, payload.actor).name,
        target: unsafeSelectPet(pets, payload.target).name,
        value: payload.value,
      };
  }
};

export { transformActMessage };
