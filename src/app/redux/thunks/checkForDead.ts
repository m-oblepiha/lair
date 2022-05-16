import type { Thunk } from 'redux/types';
import type { DeathEffect } from 'common/types/effect';
import { effects } from 'redux/slices/petsSlice';
import { pickDeathResponse } from 'common/utils/choices';
import { addRecord } from './addRecord';

const checkForDead = (): Thunk => (dispatch, getState) => {
  const { pets } = getState();
  const deaths: DeathEffect[] = [];

  for (const pet of pets) {
    if (pet.stats.health === 0) {
      const death = effects.death({ type: 'death', target: pet.id });
      deaths.push(death.payload);
      dispatch(death);
      dispatch(addRecord(death.payload));
    }
  }

  const { pets: survivors } = getState();

  const responses = survivors.flatMap((pet) =>
    deaths.map((death) => pickDeathResponse(pet, death))
  );
  const realResponses = responses.filter(
    (response) => response !== null
  ) as Exclude<typeof responses[number], null>[];

  realResponses.forEach((response) => {
    dispatch(response);
    dispatch(addRecord(response.payload));
  });
};

export { checkForDead };
