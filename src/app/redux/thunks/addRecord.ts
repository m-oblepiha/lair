import type { Thunk } from 'redux/types';
import type { Act, Response } from 'common/types';
import type { SummonEffect, DeathEffect } from 'common/types/effect';
import { generateMessage } from 'common/utils/textgen';
import { add } from 'redux/slices/recordsSlice';

const addRecord =
  (action: Act | Response | SummonEffect | DeathEffect): Thunk =>
  (dispatch, getState) => {
    const { pets } = getState();
    const message = generateMessage(pets, action);
    dispatch(add(message));
  };

export { addRecord };
