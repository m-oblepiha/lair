import { createReducer } from '@reduxjs/toolkit';
import type { IPet } from 'common/types';
import {
  sleepCase,
  supplyCase,
  attackCase,
  bullyCase,
  healCase,
  caressCase,
} from './acts';
import {
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
import { restCase, starveCase, ageCase } from './effects';
import { summonCase, deathCase } from './interactions';
import {
  increaseAttributeCase,
  decreaseAttributeCase,
  increaseStatCase,
  decreaseStatCase,
} from './leveling';

const initialState: IPet[] = [];

const petsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(...sleepCase)
    .addCase(...supplyCase)
    .addCase(...attackCase)
    .addCase(...bullyCase)
    .addCase(...healCase)
    .addCase(...caressCase)
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
    .addCase(...starveCase)
    .addCase(...ageCase)
    .addCase(...summonCase)
    .addCase(...deathCase)
    .addCase(...increaseAttributeCase)
    .addCase(...decreaseAttributeCase)
    .addCase(...increaseStatCase)
    .addCase(...decreaseStatCase);
});

export { petsReducer };

if (module.hot) module.hot.accept();
