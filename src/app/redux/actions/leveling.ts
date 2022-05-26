import type { IPet, ID } from 'common/types';
import { createAction } from '@reduxjs/toolkit';

type Attribute = Exclude<keyof IPet['attributes'], 'maxAge'>;
type Stat = Exclude<keyof IPet['stats'], 'age' | 'isAwake'>;

const increaseAttribute = createAction<
  { id: ID; attribute: Attribute },
  'pets/increaseAttribute'
>('pets/increaseAttribute');

const decreaseAttribute = createAction<
  { id: ID; attribute: Attribute },
  'pets/decreaseAttribute'
>('pets/decreaseAttribute');

const increaseStat = createAction<{ id: ID; stat: Stat }, 'pets/increaseStat'>(
  'pets/increaseStat'
);

const decreaseStat = createAction<{ id: ID; stat: Stat }, 'pets/decreaseStat'>(
  'pets/decreaseStat'
);

export { increaseAttribute, decreaseAttribute, increaseStat, decreaseStat };
