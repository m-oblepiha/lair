import type { Act } from './act';
import type { Response } from './response';
import type { Effect } from './effect';
import type { IPet } from './pet';

type TransformActToSeed<T> = T extends unknown
  ? Omit<T, 'actor' | 'target'> & { actor: IPet; target?: IPet }
  : never;

type TransformResponseToSeed<T> = T extends unknown
  ? Omit<T, 'actor' | 'target'> & { actor: IPet; target?: IPet }
  : never;

type TransformEffectToSeed<T> = T extends unknown
  ? Omit<T, 'target'> & { target: IPet }
  : never;

type ActMessageSeed = {
  type: 'act';
  action: TransformActToSeed<Act>;
};

type ResponseMessageSeed = {
  type: 'response';
  action: TransformResponseToSeed<Response>;
};

type EffectMessageSeed = {
  type: 'effect';
  action: TransformEffectToSeed<Effect>;
};

type MessageSeed = ActMessageSeed | ResponseMessageSeed | EffectMessageSeed;

export type {
  MessageSeed,
  ActMessageSeed,
  ResponseMessageSeed,
  EffectMessageSeed,
};
