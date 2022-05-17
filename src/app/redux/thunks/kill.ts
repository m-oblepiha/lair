import type { Thunk } from 'redux/types';
import type { ID } from 'common/types';
import { death } from 'redux/actions';
import { selectPet } from 'common/utils';
import { pickDeathResponse } from 'common/utils/choices';

const kill =
  (pet: ID): Thunk =>
  (dispatch, getState) => {
    const { pets } = getState();
    const deathAction = death({ target: selectPet(pets, pet) });
    dispatch(deathAction);

    const { pets: survivors } = getState();

    const responses = survivors.map((pet) =>
      pickDeathResponse(pet, deathAction.payload)
    );
    const realResponses = responses.filter(
      (response) => response !== null
    ) as Exclude<typeof responses[number], null>[];

    realResponses.forEach((response) => {
      dispatch(response);
    });
  };

export { kill };
