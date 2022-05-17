import type { Thunk } from 'redux/types';
import type { DeathInteraction } from 'common/types/interaction';
import { death } from 'redux/actions';
import { pickDeathResponse } from 'common/utils/choices';

const checkForDead = (): Thunk => (dispatch, getState) => {
  const { pets } = getState();
  const deaths: DeathInteraction[] = [];

  for (const pet of pets) {
    if (pet.stats.health === 0) {
      const deathAction = death({ target: pet.id });
      deaths.push(deathAction.payload);
      dispatch(deathAction);
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
  });
};

export { checkForDead };
