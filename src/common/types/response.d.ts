import type { ID } from './';
import type { AttackAct, BullyAct, HealAct, CaressAct } from './act';
import type { DeathInteraction } from './interaction';

type AttackPanicResponse = {
  actor: ID;
  act: AttackAct;
};

type AttackResponse = {
  actor: ID;
  act: AttackAct;
  value: number;
};

type BullyResponse = {
  actor: ID;
  act: BullyAct;
  value: number;
};

type HealResponse = {
  actor: ID;
  act: HealAct;
};

type CaressResponse = {
  actor: ID;
  act: CaressAct;
  value: number;
};

type DeathResponse = {
  actor: ID;
  act: DeathInteraction;
};

export type {
  AttackPanicResponse,
  AttackResponse,
  BullyResponse,
  HealResponse,
  CaressResponse,
  DeathResponse,
};
