import type { Thunk } from 'redux/types';
import type { IPet } from 'common/types';
import { death } from 'redux/actions';
import { pickDeathResponse } from 'common/utils/choices';

const respondToDeath =
  (pets: IPet[], action: ReturnType<typeof death>): Thunk =>
  (dispatch) => {
    const responses = pets.map((pet) => pickDeathResponse(pet, action.payload));

    const realResponses = responses.filter(
      (response) => response !== null
    ) as Exclude<typeof responses[number], null>[];

    realResponses.forEach((response) => {
      dispatch(response);
    });
  };

export { respondToDeath };
