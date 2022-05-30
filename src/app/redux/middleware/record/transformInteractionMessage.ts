import type { IPet } from 'common/types';
import type { InteractionRecord } from 'common/types/message';
import type { InteractionAction } from 'redux/types';
import { unsafeSelectPet } from 'common/utils';

const transformInteractionMessage = (
  pets: IPet[],
  { payload, type }: InteractionAction
): InteractionRecord => {
  switch (type) {
    case 'pets/death': {
      return {
        type: 'death',
        target: payload.target.name,
      };
    }
    case 'pets/summon': {
      return {
        type: 'summon',
        target: payload.target.name,
      };
    }
  }
};

export { transformInteractionMessage };
