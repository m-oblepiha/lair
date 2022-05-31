import type { ID } from './';

type SleepAct = {
  actor: ID;
};

type SupplyAct = {
  actor: ID;
  value: number;
  distribution?:
    | {
        type: 'steal';
        target: ID;
      }
    | { type: 'share' };
};

type AttackAct = {
  actor: ID;
  target: ID;
  value: number;
};

type BullyAct = {
  actor: ID;
  target: ID;
  value: number;
};

type HealAct = {
  actor: ID;
  target: ID;
  value: number;
};

type CaressAct = {
  actor: ID;
  target: ID;
  value: number;
};

export type { SleepAct, SupplyAct, AttackAct, BullyAct, HealAct, CaressAct };
