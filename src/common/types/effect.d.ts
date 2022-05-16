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
};

type StarveEffect = {
  type: 'starve';
};

type AgeEffect = {
  type: 'age';
};

type Effect =
  | SummonEffect
  | DeathEffect
  | RestEffect
  | TireEffect
  | StarveEffect
  | AgeEffect;

export type {
  SummonEffect,
  DeathEffect,
  RestEffect,
  TireEffect,
  StarveEffect,
  AgeEffect,
  Effect,
};
export type { EffectType } from 'redux/slices/petsSlice/effects';
