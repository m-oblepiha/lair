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

const wakeupCaress = createAction<WakeupCaressResponse, 'pets/wakeupCaress'>(
  'pets/wakeupCaress'
);
const attackPanic = createAction<AttackPanicResponse, 'pets/attackPanic'>(
  'pets/attackPanic'
);
const attackCounter = createAction<AttackCounterResponse, 'pets/attackCounter'>(
  'pets/attackCounter'
);
const attackAvenge = createAction<AttackAvengeResponse, 'pets/attackAvenge'>(
  'pets/attackAvenge'
);
const attackJoin = createAction<AttackJoinResponse, 'pets/attackJoin'>(
  'pets/attackJoin'
);
const bullyCounter = createAction<BullyCounterResponse, 'pets/bullyCounter'>(
  'pets/bullyCounter'
);
const bullyAvenge = createAction<BullyAvengeResponse, 'pets/bullyAvenge'>(
  'pets/bullyAvenge'
);
const bullyJoin = createAction<BullyJoinResponse, 'pets/bullyJoin'>(
  'pets/bullyJoin'
);
const healDelight = createAction<HealDelightResponse, 'pets/healDelight'>(
  'pets/healDelight'
);
const caressCounter = createAction<CaressCounterResponse, 'pets/caressCounter'>(
  'pets/caressCounter'
);
const caressJoin = createAction<CaressJoinResponse, 'pets/caressJoin'>(
  'pets/caressJoin'
);
const deathPanic = createAction<DeathPanicResponse, 'pets/deathPanic'>(
  'pets/deathPanic'
);

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
