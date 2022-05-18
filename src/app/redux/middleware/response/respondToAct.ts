import type { IPet } from 'common/types';
import type { AppDispatch, ActAction, AppGetState } from 'redux/types';
import { selectPet } from 'common/utils';
import { pickResponse } from 'common/utils/choices';
import { checkForDead } from 'redux/thunks/checkForDead';

const respondToAct =
  (act: ActAction, signal: AbortSignal) =>
  async (dispatch: AppDispatch, getState: AppGetState) => {
    if (signal.aborted) return;

    const { pets } = getState();
    let respondents = pets.filter((pet) => pet.id !== act.payload.actor.id);

    if ('target' in act.payload) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const actTarget = act.payload.target;
      const target = selectPet(pets, actTarget.id);
      if (!target) return; // it might me dead already
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

    dispatch(checkForDead());
  };

export { respondToAct };
