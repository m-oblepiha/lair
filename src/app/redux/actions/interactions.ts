import type { AnyAction } from '@reduxjs/toolkit';
import type { DeathInteraction } from 'common/types/interaction';
import { createAction } from '@reduxjs/toolkit';
import { generatePet } from 'common/utils/rolls';

const summon = createAction('pets/summon', () => ({
  payload: { target: generatePet() },
}));
const death = createAction<DeathInteraction, 'pets/death'>('pets/death');

const interactionActions = [summon, death];
type InteractionAction = ReturnType<typeof interactionActions[number]>;
type InteractionType = InteractionAction['type'];

const isInteraction = (action: AnyAction): action is InteractionAction => {
  for (const interaction of interactionActions) {
    if (action?.type === interaction.type) return true;
  }
  return false;
};

export type { InteractionType, InteractionAction };
export { isInteraction, summon, death };
