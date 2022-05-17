import type { IPet } from './';
import type { WakeupAct, AttackAct, BullyAct, HealAct, CaressAct } from './act';
import type { DeathInteraction } from './interaction';

type WakeupCaressResponse = {
  actor: IPet;
  act: WakeupAct;
  value: number;
};

type AttackPanicResponse = {
  actor: IPet;
  act: AttackAct;
};

type AttackCounterResponse = {
  actor: IPet;
  act: AttackAct;
  value: number;
};

type AttackAvengeResponse = {
  actor: IPet;
  act: AttackAct;
  value: number;
};

type AttackJoinResponse = {
  actor: IPet;
  act: AttackAct;
  value: number;
};

type BullyCounterResponse = {
  actor: IPet;
  act: BullyAct;
  value: number;
};

type BullyAvengeResponse = {
  actor: IPet;
  act: BullyAct;
  value: number;
};

type BullyJoinResponse = {
  actor: IPet;
  act: BullyAct;
  value: number;
};

type HealDelightResponse = {
  actor: IPet;
  act: HealAct;
};

type CaressCounterResponse = {
  actor: IPet;
  act: CaressAct;
  value: number;
};

type CaressJoinResponse = {
  actor: IPet;
  act: CaressAct;
  value: number;
};

type DeathPanicResponse = {
  actor: IPet;
  act: DeathInteraction;
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
