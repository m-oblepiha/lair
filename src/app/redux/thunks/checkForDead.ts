import type { AppDispatch, AppGetState } from 'redux/types';
import { death } from 'redux/actions';

const checkForDead = () => (dispatch: AppDispatch, getState: AppGetState) => {
  const { pets } = getState();
  for (const pet of pets) {
    if (pet.stats.health === 0) dispatch(death({ target: pet }));
  }
};

export { checkForDead };
