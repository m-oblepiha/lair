import type { IPet } from 'common/types';
import { summon, death } from 'redux/actions';
import { unsafeSelectPet } from 'common/utils';

const summonCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof summon>
) => {
  state.push(action.payload.target);
};
const summonCase = [summon, summonCaseReducer] as const;

const deathCaseReducer = (state: IPet[], action: ReturnType<typeof death>) => {
  const target = unsafeSelectPet(state, action.payload.target.id);

  state.splice(state.indexOf(target), 1);
  state.forEach((pet) => delete pet.relations[action.payload.target.id]);
};
const deathCase = [death, deathCaseReducer] as const;

export { summonCase, deathCase };
