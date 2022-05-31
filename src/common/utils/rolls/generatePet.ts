import type { IPet } from 'common/types';
import { avatars, type Avatar } from 'assets/images/avatars';
import { roll } from './roll';
import { generatePetName } from './generatePetName';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890', 3);

const generatePet = (): IPet => {
  const id = nanoid();

  const name = generatePetName();

  if (name === 'Щищ')
    return {
      id,
      name,
      avatar: 'mastahSheesh',
      stats: {
        sleep: 0,
        fatigue: 0,
        hunger: 0,
        health: 10,
        morale: 10,
        age: 95,
      },
      attributes: {
        supply: 10,
        vitality: 10,
        willpower: 10,
        friendliness: 10,
        maxAge: 100,
      },
      relations: {
        [id]: 100,
      },
    };

  return {
    id,
    name,
    avatar: Object.keys(avatars)[roll(0, 9)] as Avatar,
    stats: {
      sleep: 0,
      fatigue: roll(0, 10),
      hunger: roll(0, 10),
      health: roll(5, 10),
      morale: roll(2, 10),
      age: roll(0, 90),
    },
    attributes: {
      supply: roll(1, 10),
      vitality: roll(1, 10),
      willpower: roll(1, 10),
      friendliness: roll(0, 10),
      maxAge: roll(0, 100),
    },
    relations: {},
  };
};

export { generatePet };
