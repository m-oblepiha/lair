import type { AppDispatch, AppGetState } from 'redux/types';
import { death } from 'redux/actions';
import { pickDeathResponse } from 'common/utils/choices';

const respondToDeath =
  (action: ReturnType<typeof death>) =>
  (dispatch: AppDispatch, getState: AppGetState) => {
    const { pets } = getState();
    const responses = pets.map((pet) => pickDeathResponse(pet, action.payload));

    const realResponses = responses.filter(
      (response) => response !== null
    ) as Exclude<typeof responses[number], null>[];

    realResponses.forEach((response) => {
      dispatch(response);
    });
  };

export { respondToDeath };
