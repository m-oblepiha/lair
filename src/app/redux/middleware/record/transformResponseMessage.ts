import type { IPet } from 'common/types';
import type { ResponseRecord } from 'common/types/message';
import type { ResponseAction } from 'redux/types';
import { unsafeSelectPet } from 'common/utils';

const transformResponseMessage = (
  pets: IPet[],
  { payload, type }: ResponseAction
): ResponseRecord => {
  switch (type) {
    case 'pets/attackPanic': {
      return {
        type: 'attackPanic',
        actor: unsafeSelectPet(pets, payload.actor).name,
        actActor: unsafeSelectPet(pets, payload.act.actor).name,
      };
    }
    case 'pets/attackCounter': {
      return {
        type: 'attackCounter',
        actor: unsafeSelectPet(pets, payload.actor).name,
        actActor: unsafeSelectPet(pets, payload.act.actor).name,
        value: payload.value,
      };
    }
    case 'pets/attackAvenge': {
      return {
        type: 'attackAvenge',
        actor: unsafeSelectPet(pets, payload.actor).name,
        actActor: unsafeSelectPet(pets, payload.act.actor).name,
        actTarget: unsafeSelectPet(pets, payload.act.target).name,
        value: payload.value,
      };
    }
    case 'pets/attackJoin': {
      return {
        type: 'attackJoin',
        actor: unsafeSelectPet(pets, payload.actor).name,
        actTarget: unsafeSelectPet(pets, payload.act.target).name,
        value: payload.value,
      };
    }
    case 'pets/bullyCounter': {
      return {
        type: 'bullyCounter',
        actor: unsafeSelectPet(pets, payload.actor).name,
        actActor: unsafeSelectPet(pets, payload.act.actor).name,
        value: payload.value,
      };
    }
    case 'pets/bullyAvenge': {
      return {
        type: 'bullyAvenge',
        actor: unsafeSelectPet(pets, payload.actor).name,
        actActor: unsafeSelectPet(pets, payload.act.actor).name,
        value: payload.value,
      };
    }
    case 'pets/bullyJoin': {
      return {
        type: 'bullyJoin',
        actor: unsafeSelectPet(pets, payload.actor).name,
        actTarget: unsafeSelectPet(pets, payload.act.target).name,
        value: payload.value,
      };
    }
    case 'pets/healDelight': {
      return {
        type: 'healDelight',
        actor: unsafeSelectPet(pets, payload.actor).name,
      };
    }
    case 'pets/caressCounter': {
      return {
        type: 'caressCounter',
        actor: unsafeSelectPet(pets, payload.actor).name,
        actActor: unsafeSelectPet(pets, payload.act.actor).name,
        value: payload.value,
      };
    }
    case 'pets/caressJoin': {
      return {
        type: 'caressJoin',
        actor: unsafeSelectPet(pets, payload.actor).name,
        actActor: unsafeSelectPet(pets, payload.act.actor).name,
        actTarget: unsafeSelectPet(pets, payload.act.target).name,
      };
    }
    case 'pets/deathPanic': {
      return {
        type: 'deathPanic',
        actor: unsafeSelectPet(pets, payload.actor).name,
      };
    }
  }
};

export { transformResponseMessage };
