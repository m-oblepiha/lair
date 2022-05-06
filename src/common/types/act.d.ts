import type { ID } from './pet';

type SleepAct = {
  type: 'sleep';
  actor: ID;
};

type WakeupAct = {
  type: 'wakeup';
  actor: ID;
};

type SupplyAct = {
  type: 'supply';
  actor: ID;
  value: number;
  distribution?: {
    type: 'share' | 'steal';
    target: ID;
  };
};

type AttackAct = {
  type: 'attack';
  actor: ID;
  target: ID;
  value: number;
};

type BullyAct = {
  type: 'bully';
  actor: ID;
  target: ID;
  value: number;
};

type HealAct = {
  type: 'heal';
  actor: ID;
  target: ID;
  value: number;
};

type CaressAct = {
  type: 'caress';
  actor: ID;
  target: ID;
  value: number;
};

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
export type { ActType } from 'redux/slices/petsSlice/acts';
