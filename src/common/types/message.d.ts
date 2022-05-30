type SleepActRecord = {
  type: 'sleep';
  actor: string;
};

type SupplyActRecord = {
  type: 'supply';
  actor: string;
  value: number;
  distribution?: {
    type: 'share' | 'steal';
    target: string;
  };
};

type AttackActRecord = {
  type: 'attack';
  actor: string;
  target: string;
  value: number;
};

type BullyActRecord = {
  type: 'bully';
  actor: string;
  target: string;
  value: number;
};

type HealActRecord = {
  type: 'heal';
  actor: string;
  target: string;
  value: number;
};

type CaressActRecord = {
  type: 'caress';
  actor: string;
  target: string;
  value: number;
};

type SummonInteractionRecord = {
  type: 'summon';
  target: string;
};

type DeathInteractionRecord = {
  type: 'death';
  target: string;
};

type InteractionRecord = SummonInteractionRecord | DeathInteractionRecord;

type ActRecord =
  | SleepActRecord
  | SupplyActRecord
  | AttackActRecord
  | BullyActRecord
  | HealActRecord
  | CaressActRecord;

type AttackPanicResponseRecord = {
  type: 'attackPanic';
  actor: string;
  actActor: string;
};

type AttackCounterResponseRecord = {
  type: 'attackCounter';
  actor: string;
  actActor: string;
  value: number;
};

type AttackAvengeResponseRecord = {
  type: 'attackAvenge';
  actor: string;
  actActor: string;
  actTarget: string;
  value: number;
};

type AttackJoinResponseRecord = {
  type: 'attackJoin';
  actor: string;
  actTarget: string;
  value: number;
};

type BullyCounterResponseRecord = {
  type: 'bullyCounter';
  actor: string;
  actActor: string;
  value: number;
};

type BullyAvengeResponseRecord = {
  type: 'bullyAvenge';
  actor: string;
  actActor: string;
  value: number;
};

type BullyJoinResponseRecord = {
  type: 'bullyJoin';
  actor: string;
  actTarget: string;
  value: number;
};

type HealDelightResponseRecord = {
  type: 'healDelight';
  actor: string;
};

type CaressCounterResponseRecord = {
  type: 'caressCounter';
  actor: string;
  actActor: string;
  value: number;
};

type CaressJoinResponseRecord = {
  type: 'caressJoin';
  actor: string;
  actActor: string;
  actTarget: string;
};

type DeathPanicResponseRecord = {
  type: 'deathPanic';
  actor: string;
};

type ResponseRecord =
  | AttackPanicResponseRecord
  | AttackCounterResponseRecord
  | AttackAvengeResponseRecord
  | AttackJoinResponseRecord
  | BullyCounterResponseRecord
  | BullyAvengeResponseRecord
  | BullyJoinResponseRecord
  | HealDelightResponseRecord
  | CaressCounterResponseRecord
  | CaressJoinResponseRecord
  | DeathPanicResponseRecord;

export type {
  ActRecord,
  SleepActRecord,
  SupplyActRecord,
  AttackActRecord,
  BullyActRecord,
  HealActRecord,
  CaressActRecord,
};

export type {
  InteractionRecord,
  SummonInteractionRecord,
  DeathInteractionRecord,
};

export type {
  ResponseRecord,
  AttackPanicResponseRecord,
  AttackCounterResponseRecord,
  AttackAvengeResponseRecord,
  AttackJoinResponseRecord,
  BullyCounterResponseRecord,
  BullyAvengeResponseRecord,
  BullyJoinResponseRecord,
  HealDelightResponseRecord,
  CaressCounterResponseRecord,
  CaressJoinResponseRecord,
  DeathPanicResponseRecord,
};

export type Record = ActRecord | ResponseRecord | InteractionRecord;
