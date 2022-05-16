import type { Thunk } from 'redux/types';
import { timeFlow } from './timeFlow';
import { petTurn } from './petTurn';

const nextRound =
  (signal: AbortSignal): Thunk<Promise<void>> =>
  async (dispatch, getState) => {
    dispatch(timeFlow());
    const { pets } = getState();
    for (const pet of pets) {
      if (signal.aborted) return;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await dispatch(petTurn(signal, pets, pet));
    }
  };

export { nextRound };
