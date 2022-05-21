import type { Avatar } from './avatar';

type ID = string;

type IPet = {
  id: ID;
  name: string;
  avatar: Avatar;
  attributes: {
    supply: number;
    vitality: number;
    willpower: number;
    maxAge: number;
    friendliness: number;
  };
  stats: {
    fatigue: number;
    hunger: number;
    health: number;
    morale: number;
    age: number;
    isAwake: boolean;
  };
  relations: { [key: ID]: number };
};

export type { ID, IPet };
