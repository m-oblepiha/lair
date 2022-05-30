import type { ID } from 'common/types';
import { createReducer } from '@reduxjs/toolkit';
import { addActors, removeActor, shiftTurn, death } from 'redux/actions';

const initialState: {
  turn: 1 | 2 | 3 | 4;
  actors: ID[];
} = { turn: 1, actors: [] };

const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(shiftTurn, (state) => {
      if (state.turn === 4) state.turn = 1;
      else state.turn++;
    })
    .addCase(addActors, (state, { payload }) => {
      state.actors = state.actors.concat(payload);
    })
    .addCase(removeActor, (state, { payload }) => {
      state.actors = state.actors.filter((actor) => actor !== payload);
    })
    .addCase(death, (state, { payload }) => {
      state.actors.splice(state.actors.indexOf(payload.target.id), 1);
    });
});

export { orderReducer };
