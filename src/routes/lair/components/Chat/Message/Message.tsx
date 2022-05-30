import React from 'react';
import type {
  Record,
  ActRecord,
  ResponseRecord,
  InteractionRecord,
} from 'common/types/message';
import { readonlyArrayIncludes } from 'common/utils';
import { ActMessage } from './ActMessage';
import { ResponseMessage } from './ResponseMessage';
import { InteractionMessage } from './InteractionMessage';

const isActRecord = (record: Record): record is ActRecord => {
  return readonlyArrayIncludes(
    ['sleep', 'supply', 'attack', 'bully', 'caress', 'heal'] as const,
    record.type
  );
};

const isResponseRecord = (record: Record): record is ResponseRecord => {
  return readonlyArrayIncludes(
    [
      'attackPanic',
      'attackCounter',
      'attackAvenge',
      'attackJoin',
      'bullyCounter',
      'bullyAvenge',
      'bullyJoin',
      'caressCounter',
      'caressJoin',
      'healDelight',
    ] as const,
    record.type
  );
};

const isInteractionRecord = (record: Record): record is InteractionRecord => {
  return readonlyArrayIncludes(['summon', 'death'] as const, record.type);
};

const Message: React.FC<Record> = (message) => {
  if (isActRecord(message)) return ActMessage(message);
  if (isResponseRecord(message)) return ResponseMessage(message);
  if (isInteractionRecord(message)) return InteractionMessage(message);
  return null; // (parameter) message: never
};

export { Message };
