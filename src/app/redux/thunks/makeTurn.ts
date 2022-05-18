import type { ID } from 'common/types';
import type { AppDispatch, AppGetState } from 'redux/types';
import { selectPet } from 'common/utils';
import { pickAct } from 'common/utils/choices';

const makeTurn =
  (pet: ID) =>
  (dispatch: AppDispatch, getState: AppGetState): AbortController | null => {
    const { pets } = getState();
    const actor = selectPet(pets, pet);
    const act = pickAct(actor, pets);
    if (!act) return null;
    return dispatch(act);
  };

export { makeTurn };
