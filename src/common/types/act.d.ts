import type { IPet } from './';

type SleepAct = {
  actor: IPet;
};

type WakeupAct = {
  actor: IPet;
};

type SupplyAct = {
  actor: IPet;
  value: number;
  distribution?: {
    type: 'share' | 'steal';
    target: IPet;
  };
};

type AttackAct = {
  actor: IPet;
  target: IPet;
  value: number;
};

type BullyAct = {
  actor: IPet;
  target: IPet;
  value: number;
};

type HealAct = {
  actor: IPet;
  target: IPet;
  value: number;
};

type CaressAct = {
  actor: IPet;
  target: IPet;
  value: number;
};

export type {
  SleepAct,
  WakeupAct,
  SupplyAct,
  AttackAct,
  BullyAct,
  HealAct,
  CaressAct,
};
