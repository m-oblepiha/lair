import type { Thunk } from 'redux/types';
import type { IPet } from 'common/types';
import type { ActAction } from 'redux/types';
import { selectPet } from 'common/utils';
import { pickResponse } from 'common/utils/choices';

const respondToAct =
  (pets: IPet[], act: ActAction, signal: AbortSignal): Thunk<Promise<void>> =>
  async (dispatch) => {
    if (signal.aborted) return;

    let respondents = pets.filter((pet) => pet.id !== act.payload.actor.id);

    if ('target' in act.payload) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const actTarget = act.payload.target;
      const target = selectPet(pets, actTarget.id);
      const targetResponse = pickResponse(target, act, pets);
      if (targetResponse) {
        dispatch(targetResponse);
      }
      respondents = respondents.filter((pet) => pet.id !== actTarget.id);
    }

    for (const pet of respondents) {
      if (signal.aborted) return;

      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = pickResponse(pet, act, pets);
      if (response) {
        dispatch(response);
      }
    }
  };

export { respondToAct };
