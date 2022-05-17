import type { ID, IPet } from './';

type SummonInteraction = {
  target: IPet;
};

type DeathInteraction = {
  target: ID;
};

export type { SummonInteraction, DeathInteraction };
