import type { ID, IPet } from './';

type SummonInteraction = {
  target: IPet;
};

type DeathInteraction = {
  target: IPet;
};

export type { SummonInteraction, DeathInteraction };
