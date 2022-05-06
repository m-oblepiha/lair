import type { ID } from './pet';
import type { WakeupAct, AttackAct, BullyAct, HealAct, CaressAct } from './act';
import type { DeathEffect } from './effect';

type WakeupCaressResponse = {
  type: 'wakeup_caress';
  actor: ID;
  act: WakeupAct;
  value: number;
};

type AttackPanicResponse = {
  type: 'attack_panic';
  actor: ID;
  act: AttackAct;
};

type AttackCounterResponse = {
  type: 'attack_counter';
  actor: ID;
  act: AttackAct;
  value: number;
};

type AttackAvengeResponse = {
  type: 'attack_avenge';
  actor: ID;
  act: AttackAct;
  value: number;
};

type AttackJoinResponse = {
  type: 'attack_join';
  actor: ID;
  act: AttackAct;
  value: number;
};

type BullyCounterResponse = {
  type: 'bully_counter';
  actor: ID;
  act: BullyAct;
  value: number;
};

type BullyAvengeResponse = {
  type: 'bully_avenge';
  actor: ID;
  act: BullyAct;
  value: number;
};

type BullyJoinResponse = {
  type: 'bully_join';
  actor: ID;
  act: BullyAct;
  value: number;
};

type HealDelightResponse = {
  type: 'heal_delight';
  actor: ID;
  act: HealAct;
};

type CaressCounterResponse = {
  type: 'caress_counter';
  actor: ID;
  act: CaressAct;
  value: number;
};

type CaressJoinResponse = {
  type: 'caress_join';
  actor: ID;
  act: CaressAct;
  value: number;
};

type DeathPanicResponse = {
  type: 'death_panic';
  actor: ID;
  act: DeathEffect;
};

type Response =
  | WakeupCaressResponse
  | AttackPanicResponse
  | AttackAvengeResponse
  | AttackCounterResponse
  | AttackJoinResponse
  | BullyCounterResponse
  | BullyAvengeResponse
  | BullyJoinResponse
  | HealDelightResponse
  | CaressCounterResponse
  | CaressJoinResponse
  | DeathPanicResponse;

export type {
  Response,
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
export type { ResponseType } from 'redux/slices/petsSlice/responses';
