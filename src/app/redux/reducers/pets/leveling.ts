import type { IPet } from 'common/types';
import {
  increaseAttribute,
  decreaseAttribute,
  increaseStat,
  decreaseStat,
} from 'redux/actions';
import { unsafeSelectPet } from 'common/utils';

const increaseAttributeCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof increaseAttribute>
) => {
  const pet = unsafeSelectPet(state, action.payload.id);
  pet.attributes[action.payload.attribute]++;
};
const increaseAttributeCase = [
  increaseAttribute,
  increaseAttributeCaseReducer,
] as const;

const decreaseAttributeCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof decreaseAttribute>
) => {
  const pet = unsafeSelectPet(state, action.payload.id);
  pet.attributes[action.payload.attribute]--;
};
const decreaseAttributeCase = [
  decreaseAttribute,
  decreaseAttributeCaseReducer,
] as const;

const increaseStatCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof increaseStat>
) => {
  const pet = unsafeSelectPet(state, action.payload.id);
  pet.stats[action.payload.stat]++;
};
const increaseStatCase = [increaseStat, increaseStatCaseReducer] as const;

const decreaseStatCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof decreaseStat>
) => {
  const pet = unsafeSelectPet(state, action.payload.id);
  pet.stats[action.payload.stat]--;
};
const decreaseStatCase = [decreaseStat, decreaseStatCaseReducer] as const;

export {
  increaseAttributeCase,
  decreaseAttributeCase,
  increaseStatCase,
  decreaseStatCase,
};
