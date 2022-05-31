import type { IPet } from 'common/types';
import { sleep, supply, attack, bully, heal, caress } from 'redux/actions';
import { clipRelation, unsafeSelectPet } from 'common/utils';
import { changeRelation } from 'common/utils/calcs';

const sleepCaseReducer = (state: IPet[], action: ReturnType<typeof sleep>) => {
  const pet = unsafeSelectPet(state, action.payload.actor);
  const { fatigue } = pet.stats;

  pet.stats.sleep = 1 + Math.round(fatigue / 4);
};
const sleepCase = [sleep, sleepCaseReducer] as const;

const supplyCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof supply>
) => {
  const actor = unsafeSelectPet(state, action.payload.actor);

  switch (action.payload.distribution?.type) {
    case 'share':
      state.forEach((pet) => {
        const hunger = pet.stats.hunger - action.payload.value;
        pet.stats.hunger = hunger < 0 ? 0 : hunger;
        if (pet.id !== actor.id)
          pet.relations[pet.id] = clipRelation(
            (pet.relations[pet.id] ?? 0) +
              changeRelation({ target: pet, type: 'share' })
          );
      });
      break;
    case 'steal':
      const actorHunger = actor.stats.hunger - action.payload.value + 1;
      actor.stats.hunger = actorHunger < 0 ? 0 : actorHunger;

      const target = unsafeSelectPet(state, action.payload.distribution.target);
      const targetHunger = target.stats.hunger - 1;
      target.stats.hunger = targetHunger < 0 ? 0 : targetHunger;

      actor.relations[target.id] = clipRelation(
        (actor.relations[target.id] ?? 0) +
          changeRelation({ target: actor, type: 'steal' })
      );
      break;
    default:
      const hunger = actor.stats.hunger - action.payload.value;
      actor.stats.hunger = hunger < 0 ? 0 : hunger;
      break;
  }
};
const supplyCase = [supply, supplyCaseReducer] as const;

const attackCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof attack>
) => {
  const actor = unsafeSelectPet(state, action.payload.actor);
  const target = unsafeSelectPet(state, action.payload.target);

  target.stats.sleep = 0;

  const health = target.stats.health - action.payload.value;
  target.stats.health = health < 0 ? 0 : health;

  target.relations[actor.id] = clipRelation(
    (target.relations[actor.id] ?? 0) +
      changeRelation({
        target: target,
        type: 'attack',
        value: action.payload.value,
      })
  );
};
const attackCase = [attack, attackCaseReducer] as const;

const bullyCaseReducer = (state: IPet[], action: ReturnType<typeof bully>) => {
  const actor = unsafeSelectPet(state, action.payload.actor);
  const target = unsafeSelectPet(state, action.payload.target);

  target.stats.sleep = 0;

  const morale = target.stats.morale - action.payload.value;
  target.stats.morale = morale < 0 ? 0 : morale;

  target.relations[actor.id] = clipRelation(
    (target.relations[actor.id] ?? 0) +
      changeRelation({
        target: target,
        type: 'bully',
        value: action.payload.value,
      })
  );
};
const bullyCase = [bully, bullyCaseReducer] as const;

const healCaseReducer = (state: IPet[], action: ReturnType<typeof heal>) => {
  const actor = unsafeSelectPet(state, action.payload.actor);
  const target = unsafeSelectPet(state, action.payload.target);

  const health = target.stats.health + action.payload.value;
  target.stats.health = health > 10 ? 10 : health;

  target.relations[actor.id] = clipRelation(
    (target.relations[actor.id] ?? 0) +
      changeRelation({
        target: target,
        type: 'heal',
        value: action.payload.value,
      })
  );
};
const healCase = [heal, healCaseReducer] as const;

const caressCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof caress>
) => {
  const actor = unsafeSelectPet(state, action.payload.actor);
  const target = unsafeSelectPet(state, action.payload.target);

  const morale = target.stats.morale + action.payload.value;
  target.stats.morale = morale > 10 ? 10 : morale;

  target.relations[actor.id] = clipRelation(
    (target.relations[actor.id] ?? 0) +
      changeRelation({
        target: target,
        type: 'caress',
        value: action.payload.value,
      })
  );
};
const caressCase = [caress, caressCaseReducer] as const;

export { sleepCase, supplyCase, attackCase, bullyCase, healCase, caressCase };
