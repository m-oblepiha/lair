import type { AppDispatch, AppGetState } from 'redux/types';
import { shiftTurn, removeActor } from 'redux/actions';
import { timeFlow } from './timeFlow';
import { selectPet } from 'common/utils';
import { pickAct } from 'common/utils/choices';

const next =
  () =>
  (dispatch: AppDispatch, getState: AppGetState): AbortController | null => {
    const { order, pets, hearts } = getState();

    if (hearts === 0) return null;

    if (order.turn === 1) dispatch(timeFlow());

    dispatch(shiftTurn());

    if (!order.actors.length) return null;

    const { payload: actorID } = dispatch(removeActor(order.actors[0]));
    const actor = selectPet(pets, actorID);

    const act = pickAct(actor, pets);
    if (!act) return null;

    return dispatch(act);
  };

export { next };
