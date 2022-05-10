import type { PayloadAction } from '@reduxjs/toolkit';
import type { IPet } from 'common/types';
import type {
  SleepAct,
  WakeupAct,
  SupplyAct,
  AttackAct,
  BullyAct,
  HealAct,
  CaressAct,
} from 'common/types/act';
import { clipRelation, selectPet } from 'common/utils';
import { changeRelation } from 'common/utils/calcs';

const sleep = (
  state: IPet[],
  action: PayloadAction<Omit<SleepAct, 'type'>>
) => {
  const pet = selectPet(state, action.payload.actor);
  pet.stats.isAwake = false;
};

const wakeup = (
  state: IPet[],
  action: PayloadAction<Omit<WakeupAct, 'type'>>
) => {
  const pet = selectPet(state, action.payload.actor);
  pet.stats.isAwake = true;
};

const supply = (
  state: IPet[],
  action: PayloadAction<Omit<SupplyAct, 'type'>>
) => {
  const pet = selectPet(state, action.payload.actor);

  const hunger = pet.stats.hunger - action.payload.value;
  pet.stats.hunger = hunger < 0 ? 0 : hunger;

  if (action.payload.distribution) {
    const target = selectPet(state, action.payload.distribution.target);

    const targetHunger = target.stats.hunger - 1;
    target.stats.hunger = targetHunger < 0 ? 0 : targetHunger;

    if (action.payload.distribution.type === 'steal') {
      pet.relations[target.id] = clipRelation(
        pet.relations[target.id] +
          changeRelation({ target: pet, type: 'steal' })
      );
    }
    if (action.payload.distribution.type === 'share') {
      target.relations[pet.id] = clipRelation(
        target.relations[pet.id] +
          changeRelation({ target: target, type: 'share' })
      );
    }
  }
};

const attack = (
  state: IPet[],
  action: PayloadAction<Omit<AttackAct, 'type'>>
) => {
  const actor = selectPet(state, action.payload.actor);
  const target = selectPet(state, action.payload.target);

  const health = target.stats.health - action.payload.value;
  target.stats.health = health < 0 ? 0 : health;

  target.relations[actor.id] = clipRelation(
    target.relations[actor.id] +
      changeRelation({
        target: target,
        type: 'attack',
        value: action.payload.value,
      })
  );
};

const bully = (
  state: IPet[],
  action: PayloadAction<Omit<BullyAct, 'type'>>
) => {
  const actor = selectPet(state, action.payload.actor);
  const target = selectPet(state, action.payload.target);

  const morale = target.stats.morale - action.payload.value;
  target.stats.morale = morale < 0 ? 0 : morale;

  target.relations[actor.id] = clipRelation(
    target.relations[actor.id] +
      changeRelation({
        target: target,
        type: 'bully',
        value: action.payload.value,
      })
  );
};

const heal = (state: IPet[], action: PayloadAction<Omit<HealAct, 'type'>>) => {
  const actor = selectPet(state, action.payload.actor);
  const target = selectPet(state, action.payload.target);

  const health = target.stats.health + action.payload.value;
  target.stats.health = health > 10 ? 10 : health;

  target.relations[actor.id] = clipRelation(
    target.relations[actor.id] +
      changeRelation({
        target: target,
        type: 'heal',
        value: action.payload.value,
      })
  );
};

const caress = (
  state: IPet[],
  action: PayloadAction<Omit<CaressAct, 'type'>>
) => {
  const actor = selectPet(state, action.payload.actor);
  const target = selectPet(state, action.payload.target);

  const morale = target.stats.morale + action.payload.value;
  target.stats.morale = morale > 10 ? 10 : morale;

  target.relations[actor.id] = clipRelation(
    target.relations[actor.id] +
      changeRelation({
        target: target,
        type: 'caress',
        value: action.payload.value,
      })
  );
};

const actReducers = { sleep, wakeup, supply, attack, bully, heal, caress };

type ActType = keyof typeof actReducers;

export { actReducers, type ActType };
