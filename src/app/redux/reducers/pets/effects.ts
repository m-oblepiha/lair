import type { IPet } from 'common/types';
import { rest, tire, starve, age } from 'redux/actions';
import { selectPet } from 'common/utils';

const restCaseReducer = (state: IPet[], action: ReturnType<typeof rest>) => {
  const pet = selectPet(state, action.payload.target);
  if (!pet) return;

  const { fatigue, morale, hunger, health } = pet.stats;

  if (fatigue > 3) pet.stats.fatigue = pet.stats.fatigue - 3;
  else {
    pet.stats.fatigue = 0;
    if (morale !== 10) pet.stats.morale++;
    if (hunger === 0 && health !== 10) pet.stats.health++;
  }
};
const restCase = [rest, restCaseReducer] as const;

const tireCaseReducer = (state: IPet[], action: ReturnType<typeof tire>) => {
  const { preroll } = action.payload;

  for (const pet of state) {
    if (!pet.stats.isAwake) continue;
    const { fatigue, morale } = pet.stats;
    const { vitality, willpower } = pet.attributes;
    if (fatigue === 10) {
      if (morale === 0 && preroll > vitality) pet.stats.health--;
      else if (preroll > willpower) pet.stats.morale--;
    } else pet.stats.fatigue++;
  }
};
const tireCase = [tire, tireCaseReducer] as const;

const starveCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof starve>
) => {
  const { preroll } = action.payload;

  for (const pet of state) {
    const hunger = pet.stats.hunger;
    const { vitality, willpower } = pet.attributes;
    if (hunger === 10) {
      if (preroll > vitality) pet.stats.health--;
      if (preroll > willpower) pet.stats.morale--;
    } else pet.stats.hunger++;
  }
};
const starveCase = [starve, starveCaseReducer] as const;

const ageCaseReducer = (state: IPet[]) => {
  for (const pet of state) {
    pet.stats.age++;
    if (pet.stats.age > pet.attributes.maxAge) pet.stats.health = 0;
  }
};
const ageCase = [age, ageCaseReducer] as const;

export { restCase, tireCase, starveCase, ageCase };
