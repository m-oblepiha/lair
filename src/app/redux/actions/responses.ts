import type { AnyAction } from '@reduxjs/toolkit';
import type {
  AttackPanicResponse,
  AttackResponse,
  BullyResponse,
  HealResponse,
  CaressResponse,
  DeathResponse,
} from 'common/types/response';
import { createAction } from '@reduxjs/toolkit';

const attackPanic = createAction<AttackPanicResponse, 'pets/attackPanic'>(
  'pets/attackPanic'
);
const attackCounter = createAction<AttackResponse, 'pets/attackCounter'>(
  'pets/attackCounter'
);
const attackAvenge = createAction<AttackResponse, 'pets/attackAvenge'>(
  'pets/attackAvenge'
);
const attackJoin = createAction<AttackResponse, 'pets/attackJoin'>(
  'pets/attackJoin'
);
const bullyCounter = createAction<BullyResponse, 'pets/bullyCounter'>(
  'pets/bullyCounter'
);
const bullyAvenge = createAction<BullyResponse, 'pets/bullyAvenge'>(
  'pets/bullyAvenge'
);
const bullyJoin = createAction<BullyResponse, 'pets/bullyJoin'>(
  'pets/bullyJoin'
);
const healDelight = createAction<HealResponse, 'pets/healDelight'>(
  'pets/healDelight'
);
const caressCounter = createAction<CaressResponse, 'pets/caressCounter'>(
  'pets/caressCounter'
);
const caressJoin = createAction<CaressResponse, 'pets/caressJoin'>(
  'pets/caressJoin'
);
const deathPanic = createAction<DeathResponse, 'pets/deathPanic'>(
  'pets/deathPanic'
);

const responseActions = [
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

const isResponse = (action: AnyAction): action is ResponseAction => {
  for (const response of responseActions) {
    if (action?.type === response.type) return true;
  }
  return false;
};

export type { ResponseType, ResponseAction };
export {
  isResponse,
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
