import type { IPet } from 'common/types';
import { summon, death } from 'redux/actions';

const summonCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof summon>
) => {
  state.push(action.payload.target);
};
const summonCase = [summon, summonCaseReducer] as const;

const deathCaseReducer = (state: IPet[], action: ReturnType<typeof death>) => {
  const survivors = state.filter((pet) => pet.id !== action.payload.target.id);
  survivors.forEach((pet) => delete pet.relations[action.payload.target.id]);
  return survivors;
};
const deathCase = [death, deathCaseReducer] as const;

export { summonCase, deathCase };
