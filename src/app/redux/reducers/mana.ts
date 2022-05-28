import { createReducer } from '@reduxjs/toolkit';
import {
  addMana,
  increaseAttribute,
  decreaseAttribute,
  increaseStat,
  decreaseStat,
} from 'redux/actions';

const initialState: number = 5;

const manaReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addMana, (state) => state++)
    .addCase(increaseAttribute, (state) => state - 3)
    .addCase(decreaseAttribute, (state) => state - 3)
    .addCase(increaseStat, (state) => state - 1)
    .addCase(decreaseStat, (state) => state - 1);
});

export { manaReducer };
