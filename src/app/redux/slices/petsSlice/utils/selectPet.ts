import type { IPet, ID } from 'common/types';

export const selectPet = (state: IPet[], id: ID) =>
  state.find((pet) => pet.id === id) as IPet;
