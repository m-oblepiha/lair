import type { Avatar } from 'assets/images/avatars';

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

type Attribute = Exclude<keyof IPet['attributes'], 'maxAge'>;

type Stat = Exclude<keyof IPet['stats'], 'age' | 'isAwake'>;

export type { ID, IPet, Attribute, Stat };
