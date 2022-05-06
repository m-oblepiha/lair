import type { ID, IPet } from './pet';

type SummonEffect = {
  type: 'summon';
  target: IPet;
};

type DeathEffect = {
  type: 'death';
  target: ID;
};

type RestEffect = {
  type: 'rest';
  target: ID;
};

type TireEffect = {
  type: 'tire';
  target: ID;
};

type StarveEffect = {
  type: 'starve';
  target: ID;
};

type Effect =
  | SummonEffect
  | DeathEffect
  | RestEffect
  | TireEffect
  | StarveEffect;

export type {
  SummonEffect,
  DeathEffect,
  RestEffect,
  TireEffect,
  StarveEffect,
  Effect,
};
export type { EffectType } from 'redux/slices/petsSlice/effects';
