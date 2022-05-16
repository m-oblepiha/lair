import type { Thunk } from 'redux/types';
import type { ID } from 'common/types';
import { effects } from 'redux/slices/petsSlice';
import { pickDeathResponse } from 'common/utils/choices';
import { addRecord } from './addRecord';

const kill =
  (pet: ID): Thunk =>
  (dispatch, getState) => {
    const death = effects.death({ type: 'death', target: pet });
    dispatch(effects.death({ type: 'death', target: pet }));
    dispatch(addRecord(death.payload));

    const { pets } = getState();

    const responses = pets.map((pet) => pickDeathResponse(pet, death.payload));
    const realResponses = responses.filter(
      (response) => response !== null
    ) as Exclude<typeof responses[number], null>[];

    realResponses.forEach((response) => {
      dispatch(response);
      dispatch(addRecord(response.payload));
    });
  };

export { kill };
