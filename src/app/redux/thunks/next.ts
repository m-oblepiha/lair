import type { AppDispatch, AppGetState } from 'redux/types';
import { shiftTurn, removeActor } from 'redux/actions';
import { timeFlow } from './timeFlow';
import { pickAct } from 'common/utils/choices';

const next =
  () =>
  (dispatch: AppDispatch, getState: AppGetState): AbortController | null => {
    const { order, hearts, time, pause } = getState();
    let { pets } = getState();

    if (hearts === 0 || time.day === 100 || pause || pets.length === 0)
      return null;

    if (order.turn === 1) dispatch(timeFlow());
    dispatch(shiftTurn());

    if (!order.actors.length) return null;

    const { payload: actorID } = dispatch(removeActor(order.actors[0]));

    pets = getState().pets;
    const act = pickAct(actorID, pets);

    if (!act) return null;

    return dispatch(act);
  };

export { next };
