import type { ID } from './pet';

interface SleepAct {
  type: 'sleep';
  actor: ID;
}

interface WakeupAct {
  type: 'wakeup';
  actor: ID;
}

interface SupplyAct {
  type: 'supply';
  actor: ID;
  value: number;
  distribution?: {
    type: 'share' | 'steal';
    target: ID;
  };
}

interface AttackAct {
  type: 'attack';
  actor: ID;
  target: ID;
  value: number;
}

interface BullyAct {
  type: 'bully';
  actor: ID;
  target: ID;
  value: number;
}

interface HealAct {
  type: 'heal';
  actor: ID;
  target: ID;
  value: number;
}

interface CaressAct {
  type: 'caress';
  actor: ID;
  target: ID;
  value: number;
}

type Act =
  | SleepAct
  | WakeupAct
  | SupplyAct
  | AttackAct
  | BullyAct
  | HealAct
  | CaressAct;

export type {
  SleepAct,
  WakeupAct,
  SupplyAct,
  AttackAct,
  BullyAct,
  HealAct,
  CaressAct,
  Act,
};
