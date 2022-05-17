import type { Thunk } from 'redux/types';
import type { IPet } from 'common/types';
import { pickAct } from 'common/utils/choices';
import { respondToAct } from './respondToAct';
import { checkForDead } from './checkForDead';

const petTurn =
  (signal: AbortSignal, pets: IPet[], actor: IPet): Thunk<Promise<void>> =>
  async (dispatch) => {
    const act = pickAct(actor, pets);
    if (!act) return;
    if (signal.aborted) return;
    dispatch(act);
    if (signal.aborted) return;
    dispatch(checkForDead());
    await dispatch(respondToAct(pets, act));
    dispatch(checkForDead());
  };

export { petTurn };
