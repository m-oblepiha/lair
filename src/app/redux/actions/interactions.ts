import type { DeathInteraction } from 'common/types/interaction';
import { createAction } from '@reduxjs/toolkit';
import { generatePet } from 'common/utils/rolls';

const summon = createAction('summon', () => ({
  payload: { target: generatePet() },
}));
const death = createAction<DeathInteraction, 'death'>('death');

const interactionActions = [summon, death];
type InteractionAction = ReturnType<typeof interactionActions[number]>;
type InteractionType = InteractionAction['type'];

export type { InteractionType, InteractionAction };
export { summon, death };
