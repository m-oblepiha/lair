import type { IPet, Act, Response, Effect } from 'common/types';
import type { SummonEffect, DeathEffect } from 'common/types/effect';
import { actTypes } from 'redux/slices/petsSlice/acts';
import { responseTypes } from 'redux/slices/petsSlice/responses';
import { effectTypes } from 'redux/slices/petsSlice/effects';
import { readonlyArrayIncludes } from 'common/utils/readonlyArrayIncludes';
import { actMessage } from './actMessage';
import { responseMessage } from './responseMessage';
import { effectMessage } from './effectMessage';

const isAct = (action: Act | Response | Effect): action is Act => {
  return readonlyArrayIncludes(actTypes, action.type);
};
const isResponse = (action: Act | Response | Effect): action is Response => {
  return readonlyArrayIncludes(responseTypes, action.type);
};
const isEffect = (action: Act | Response | Effect): action is Effect => {
  return readonlyArrayIncludes(effectTypes, action.type);
};

const generateMessage = (
  pets: IPet[],
  action: Act | Response | SummonEffect | DeathEffect
): string => {
  if (isAct(action)) return actMessage(pets, action);
  if (isResponse(action)) return responseMessage(pets, action);
  if (isEffect(action)) return effectMessage(pets, action);
  return action; // never
};

export { generateMessage };
