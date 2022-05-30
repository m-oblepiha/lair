import { createReducer } from '@reduxjs/toolkit';
import {
  addMana,
  increaseAttribute,
  decreaseAttribute,
  increaseStat,
  decreaseStat,
} from 'redux/actions';

const initialState: number = 10;

const manaReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addMana, (state) => state + 1)
    .addCase(increaseAttribute, (state) => state - 5)
    .addCase(decreaseAttribute, (state) => state - 5)
    .addCase(increaseStat, (state) => state - 1)
    .addCase(decreaseStat, (state) => state - 1);
});

export { manaReducer };
