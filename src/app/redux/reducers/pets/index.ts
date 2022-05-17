import { createReducer } from '@reduxjs/toolkit';
import type { IPet } from 'common/types';
import {
  sleepCase,
  wakeupCase,
  supplyCase,
  attackCase,
  bullyCase,
  healCase,
  caressCase,
} from './acts';
import {
  wakeupCaressCase,
  attackPanicCase,
  attackCounterCase,
  attackAvengeCase,
  attackJoinCase,
  bullyCounterCase,
  bullyAvengeCase,
  bullyJoinCase,
  healDelightCase,
  caressCounterCase,
  caressJoinCase,
  deathPanicCase,
} from './responses';
import { restCase, tireCase, starveCase, ageCase } from './effects';
import { summonCase, deathCase } from './interactions';

const initialState: IPet[] = [];

const petsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(...sleepCase)
    .addCase(...wakeupCase)
    .addCase(...supplyCase)
    .addCase(...attackCase)
    .addCase(...bullyCase)
    .addCase(...healCase)
    .addCase(...caressCase)
    .addCase(...wakeupCaressCase)
    .addCase(...attackPanicCase)
    .addCase(...attackCounterCase)
    .addCase(...attackAvengeCase)
    .addCase(...attackJoinCase)
    .addCase(...bullyCounterCase)
    .addCase(...bullyAvengeCase)
    .addCase(...bullyJoinCase)
    .addCase(...healDelightCase)
    .addCase(...caressCounterCase)
    .addCase(...caressJoinCase)
    .addCase(...deathPanicCase)
    .addCase(...restCase)
    .addCase(...tireCase)
    .addCase(...starveCase)
    .addCase(...ageCase)
    .addCase(...summonCase)
    .addCase(...deathCase);
});

export { petsReducer };
