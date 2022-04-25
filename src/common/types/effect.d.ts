import type { ID } from './pet';
import type { EffectType } from 'redux/slices/petsSlice/drafts/effects';

interface Effect {
  type: EffectType;
  target: ID;
}

export type { Effect };
