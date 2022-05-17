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

const sleep = createAction<SleepAct, 'sleep'>('sleep');
const wakeup = createAction<WakeupAct, 'wakeup'>('wakeup');
const supply = createAction<SupplyAct, 'supply'>('supply');
const attack = createAction<AttackAct, 'attack'>('attack');
const bully = createAction<BullyAct, 'bully'>('bully');
const heal = createAction<HealAct, 'heal'>('heal');
const caress = createAction<CaressAct, 'caress'>('caress');

const actActions = [sleep, wakeup, supply, attack, bully, heal, caress];
type ActAction = ReturnType<typeof actActions[number]>;
type ActType = ActAction['type'];

export type { ActType, ActAction };
export { sleep, wakeup, supply, attack, bully, heal, caress };
