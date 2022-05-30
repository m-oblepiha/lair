import type { IPet, ID } from 'common/types';

const selectPet = (state: IPet[], id: ID) => state.find((pet) => pet.id === id);

const unsafeSelectPet = (state: IPet[], id: ID) => selectPet(state, id) as IPet;

export { selectPet, unsafeSelectPet };
