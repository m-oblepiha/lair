import type {
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
} from 'common/types/response';
import { createAction } from '@reduxjs/toolkit';

const wakeupCaress = createAction<WakeupCaressResponse, 'wakeupCaress'>(
  'wakeupCaress'
);
const attackPanic = createAction<AttackPanicResponse, 'attackPanic'>(
  'attackPanic'
);
const attackCounter = createAction<AttackCounterResponse, 'attackCounter'>(
  'attackCounter'
);
const attackAvenge = createAction<AttackAvengeResponse, 'attackAvenge'>(
  'attackAvenge'
);
const attackJoin = createAction<AttackJoinResponse, 'attackJoin'>('attackJoin');
const bullyCounter = createAction<BullyCounterResponse, 'bullyCounter'>(
  'bullyCounter'
);
const bullyAvenge = createAction<BullyAvengeResponse, 'bullyAvenge'>(
  'bullyAvenge'
);
const bullyJoin = createAction<BullyJoinResponse, 'bullyJoin'>('bullyJoin');
const healDelight = createAction<HealDelightResponse, 'healDelight'>(
  'healDelight'
);
const caressCounter = createAction<CaressCounterResponse, 'caressCounter'>(
  'caressCounter'
);
const caressJoin = createAction<CaressJoinResponse, 'caressJoin'>('caressJoin');
const deathPanic = createAction<DeathPanicResponse, 'deathPanic'>('deathPanic');

const responseActions = [
  wakeupCaress,
  attackPanic,
  attackCounter,
  attackAvenge,
  attackJoin,
  bullyCounter,
  bullyAvenge,
  bullyJoin,
  healDelight,
  caressCounter,
  caressJoin,
  deathPanic,
];
type ResponseAction = ReturnType<typeof responseActions[number]>;
type ResponseType = ResponseAction['type'];

export type { ResponseType, ResponseAction };
export {
  wakeupCaress,
  attackPanic,
  attackCounter,
  attackAvenge,
  attackJoin,
  bullyCounter,
  bullyAvenge,
  bullyJoin,
  healDelight,
  caressCounter,
  caressJoin,
  deathPanic,
};
