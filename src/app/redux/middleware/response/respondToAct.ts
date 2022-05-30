import type { AppDispatch, ActAction, AppGetState } from 'redux/types';
import { pickResponse } from 'common/utils/choices';
import { checkForDead } from 'redux/thunks/checkForDead';

const respondToAct =
  (act: ActAction, signal: AbortSignal) =>
  async (dispatch: AppDispatch, getState: AppGetState) => {
    const { pets } = getState();
    let respondents = pets
      .filter((pet) => pet.id !== act.payload.actor)
      .filter((pet) => !pet.stats.sleep);

    if ('target' in act.payload) {
      if (!signal.aborted)
        await new Promise((resolve) => setTimeout(resolve, 100));

      const actTarget = act.payload.target;

      const targetResponse = pickResponse(actTarget, act, pets);
      if (targetResponse) dispatch(targetResponse);

      respondents = respondents.filter((pet) => pet.id !== actTarget);
    }

    for (const pet of respondents) {
      if (!signal.aborted)
        await new Promise((resolve) => setTimeout(resolve, 200));

      const response = pickResponse(pet.id, act, respondents);
      if (response) dispatch(response);
    }

    dispatch(checkForDead());
  };

export { respondToAct };
