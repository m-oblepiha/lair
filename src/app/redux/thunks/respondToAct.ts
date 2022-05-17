import type { Thunk } from 'redux/types';
import type { IPet } from 'common/types';
import type { ActAction } from 'redux/types';
import { selectPet } from 'common/utils';
import { pickResponse } from 'common/utils/choices';

const respondToAct =
  (pets: IPet[], act: ActAction): Thunk<Promise<void>> =>
  async (dispatch) => {
    let respondents = pets.filter((pet) => pet.id !== act.payload.actor);

    if ('target' in act.payload) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const actTarget = act.payload.target;
      const target = selectPet(pets, actTarget);
      const targetResponse = pickResponse(target, act, pets);
      if (targetResponse) {
        dispatch(targetResponse);
      }
      respondents = respondents.filter((pet) => pet.id !== actTarget);
    }

    for (const pet of respondents) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = pickResponse(pet, act, pets);
      if (response) {
        dispatch(response);
      }
    }
  };

export { respondToAct };
