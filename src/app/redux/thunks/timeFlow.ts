import type { AppDispatch, AppGetState } from 'redux/types';
import { timePass, tire, starve, age } from 'redux/actions';

const timeFlow = () => (dispatch: AppDispatch, getState: AppGetState) => {
  dispatch(timePass());
  const { time } = getState();

  dispatch(tire());
  if ([2, 4].includes(time.phase)) dispatch(starve());
  if (time.phase === 1) dispatch(age());

  // dispatch(checkForDead());
};

export { timeFlow };
