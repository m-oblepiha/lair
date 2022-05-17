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
  state = state.filter((pet) => pet.id !== action.payload.target);
  state.forEach((pet) => delete pet.relations[action.payload.target]);
};
const deathCase = [death, deathCaseReducer] as const;

export { summonCase, deathCase };
