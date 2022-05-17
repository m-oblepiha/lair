import type {
  SleepAct,
  WakeupAct,
  SupplyAct,
  AttackAct,
  BullyAct,
  HealAct,
  CaressAct,
} from 'common/types/act';
import { createAction } from '@reduxjs/toolkit';

const sleep = createAction<SleepAct, 'pets/sleep'>('pets/sleep');
const wakeup = createAction<WakeupAct, 'pets/wakeup'>('pets/wakeup');
const supply = createAction<SupplyAct, 'pets/supply'>('pets/supply');
const attack = createAction<AttackAct, 'pets/attack'>('pets/attack');
const bully = createAction<BullyAct, 'pets/bully'>('pets/bully');
const heal = createAction<HealAct, 'pets/heal'>('pets/heal');
const caress = createAction<CaressAct, 'pets/caress'>('pets/caress');

const actActions = [sleep, wakeup, supply, attack, bully, heal, caress];
type ActAction = ReturnType<typeof actActions[number]>;
type ActType = ActAction['type'];

export type { ActType, ActAction };
export { sleep, wakeup, supply, attack, bully, heal, caress };
