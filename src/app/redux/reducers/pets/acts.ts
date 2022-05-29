import type { IPet } from 'common/types';
import {
  sleep,
  wakeup,
  supply,
  attack,
  bully,
  heal,
  caress,
} from 'redux/actions';
import { clipRelation, selectPet } from 'common/utils';
import { changeRelation } from 'common/utils/calcs';

const sleepCaseReducer = (state: IPet[], action: ReturnType<typeof sleep>) => {
  const pet = selectPet(state, action.payload.actor.id);
  pet.stats.isAwake = false;
};
const sleepCase = [sleep, sleepCaseReducer] as const;

const wakeupCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof wakeup>
) => {
  const pet = selectPet(state, action.payload.actor.id);
  pet.stats.isAwake = true;
};
const wakeupCase = [wakeup, wakeupCaseReducer] as const;

const supplyCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof supply>
) => {
  const pet = selectPet(state, action.payload.actor.id);

  const hunger = pet.stats.hunger - action.payload.value;
  pet.stats.hunger = hunger < 0 ? 0 : hunger;

  if (action.payload.distribution) {
    const target = selectPet(state, action.payload.distribution.target.id);

    target.stats.isAwake = true;

    const targetHunger = target.stats.hunger - 1;
    target.stats.hunger = targetHunger < 0 ? 0 : targetHunger;

    if (action.payload.distribution.type === 'steal') {
      pet.relations[target.id] = clipRelation(
        (pet.relations[target.id] ?? 0) +
          changeRelation({ target: pet, type: 'steal' })
      );
    }
    if (action.payload.distribution.type === 'share') {
      target.relations[pet.id] = clipRelation(
        (target.relations[pet.id] ?? 0) +
          changeRelation({ target: target, type: 'share' })
      );
    }
  }
};
const supplyCase = [supply, supplyCaseReducer] as const;

const attackCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof attack>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  const target = selectPet(state, action.payload.target.id);

  target.stats.isAwake = true;

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
  const actor = selectPet(state, action.payload.actor.id);
  const target = selectPet(state, action.payload.target.id);

  target.stats.isAwake = true;

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
  const actor = selectPet(state, action.payload.actor.id);
  const target = selectPet(state, action.payload.target.id);

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
  const actor = selectPet(state, action.payload.actor.id);
  const target = selectPet(state, action.payload.target.id);

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

export {
  sleepCase,
  wakeupCase,
  supplyCase,
  attackCase,
  bullyCase,
  healCase,
  caressCase,
};
