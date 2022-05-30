import type { AnyAction } from '@reduxjs/toolkit';
import type {
  SleepAct,
  SupplyAct,
  AttackAct,
  BullyAct,
  HealAct,
  CaressAct,
} from 'common/types/act';
import { createAction } from '@reduxjs/toolkit';

const sleep = createAction<SleepAct, 'pets/sleep'>('pets/sleep');
const supply = createAction<SupplyAct, 'pets/supply'>('pets/supply');
const attack = createAction<AttackAct, 'pets/attack'>('pets/attack');
const bully = createAction<BullyAct, 'pets/bully'>('pets/bully');
const heal = createAction<HealAct, 'pets/heal'>('pets/heal');
const caress = createAction<CaressAct, 'pets/caress'>('pets/caress');

const actActions = [sleep, supply, attack, bully, heal, caress];
type ActAction = ReturnType<typeof actActions[number]>;
type ActType = ActAction['type'];

const isAct = (action: AnyAction): action is ActAction => {
  for (const act of actActions) {
    if (action?.type === act.type) return true;
  }
  return false;
};

export type { ActType, ActAction };
export { isAct, sleep, supply, attack, bully, heal, caress };
