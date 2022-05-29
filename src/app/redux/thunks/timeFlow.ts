import type { AppDispatch, AppGetState } from 'redux/types';
import { timePass, rest, starve, age, addMana, addActors } from 'redux/actions';
import { checkForDead } from './checkForDead';

const timeFlow = () => (dispatch: AppDispatch, getState: AppGetState) => {
  dispatch(timePass());
  const { time, pets } = getState();

  dispatch(rest());
  if ([2, 4].includes(time.phase)) dispatch(starve());
  if (time.phase === 1) {
    dispatch(age());
    if (pets.length) dispatch(addMana());
  }

  dispatch(checkForDead());

  const { pets: survivors } = getState();
  dispatch(addActors(survivors.map((pet) => pet.id)));
};

export { timeFlow };
