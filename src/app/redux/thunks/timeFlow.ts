import type { Thunk } from 'redux/types';
import { timePass } from 'redux/slices/timeSlice';
import { effects } from 'redux/slices/petsSlice';
import { checkForDead } from './checkForDead';

const timeFlow = (): Thunk => (dispatch, getState) => {
  dispatch(timePass());
  const { time } = getState();

  dispatch(effects.tire());
  if ([2, 4].includes(time.phase)) dispatch(effects.starve());
  if (time.phase === 1) dispatch(effects.age());

  dispatch(checkForDead());
};

export { timeFlow };
