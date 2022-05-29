import type { IPet } from 'common/types';
import { rest, starve, age } from 'redux/actions';

const restCaseReducer = (state: IPet[], action: ReturnType<typeof rest>) => {
  const { preroll } = action.payload;

  for (const pet of state) {
    const { fatigue, morale, hunger, health } = pet.stats;
    const { vitality, willpower } = pet.attributes;

    if (pet.stats.isAwake) {
      if (fatigue === 10) {
        if (morale === 0 && health > 0 && preroll > vitality)
          pet.stats.health--;
        else if (morale > 0 && preroll > willpower) pet.stats.morale--;
      } else pet.stats.fatigue++;
    } else {
      if (fatigue > 3) pet.stats.fatigue = pet.stats.fatigue - 3;
      else {
        pet.stats.fatigue = 0;
        if (morale < 10) pet.stats.morale++;
        if (hunger < 3 && health < 10) pet.stats.health++;
      }
    }
  }
};
const restCase = [rest, restCaseReducer] as const;

const starveCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof starve>
) => {
  const { preroll } = action.payload;

  for (const pet of state) {
    const { hunger, morale, health } = pet.stats;
    const { vitality, willpower } = pet.attributes;
    if (hunger === 10) {
      if (health > 0 && preroll > vitality) pet.stats.health--;
      if (morale > 0 && preroll > willpower) pet.stats.morale--;
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

export { restCase, starveCase, ageCase };
