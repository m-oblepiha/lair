import type { Thunk } from 'redux/types';
import type { IPet, Act } from 'common/types';
import { selectPet } from 'common/utils';
import { pickResponse } from 'common/utils/choices';
import { addRecord } from './addRecord';

const respondToAct =
  (pets: IPet[], act: Act): Thunk<Promise<void>> =>
  async (dispatch) => {
    let respondents = pets.filter((pet) => pet.id !== act.actor);

    if ('target' in act) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const target = selectPet(pets, act.target);
      const targetResponse = pickResponse(target, act, pets);
      if (targetResponse) {
        dispatch(targetResponse);
        dispatch(addRecord(targetResponse.payload));
      }
      respondents = respondents.filter((pet) => pet.id !== act.target);
    }

    for (const pet of respondents) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = pickResponse(pet, act, pets);
      if (response) {
        dispatch(response);
        dispatch(addRecord(response.payload));
      }
    }
  };

export { respondToAct };
