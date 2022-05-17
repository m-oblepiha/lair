import type { ID } from './';
import type { WakeupAct, AttackAct, BullyAct, HealAct, CaressAct } from './act';
import type { DeathEffect } from './effect';

type WakeupCaressResponse = {
  actor: ID;
  act: WakeupAct;
  value: number;
};

type AttackPanicResponse = {
  actor: ID;
  act: AttackAct;
};

type AttackCounterResponse = {
  actor: ID;
  act: AttackAct;
  value: number;
};

type AttackAvengeResponse = {
  actor: ID;
  act: AttackAct;
  value: number;
};

type AttackJoinResponse = {
  actor: ID;
  act: AttackAct;
  value: number;
};

type BullyCounterResponse = {
  actor: ID;
  act: BullyAct;
  value: number;
};

type BullyAvengeResponse = {
  actor: ID;
  act: BullyAct;
  value: number;
};

type BullyJoinResponse = {
  actor: ID;
  act: BullyAct;
  value: number;
};

type HealDelightResponse = {
  actor: ID;
  act: HealAct;
};

type CaressCounterResponse = {
  actor: ID;
  act: CaressAct;
  value: number;
};

type CaressJoinResponse = {
  actor: ID;
  act: CaressAct;
  value: number;
};

type DeathPanicResponse = {
  actor: ID;
  act: DeathEffect;
};

export type {
  WakeupCaressResponse,
  AttackPanicResponse,
  AttackCounterResponse,
  AttackAvengeResponse,
  AttackJoinResponse,
  BullyCounterResponse,
  BullyAvengeResponse,
  BullyJoinResponse,
  HealDelightResponse,
  CaressCounterResponse,
  CaressJoinResponse,
  DeathPanicResponse,
};
