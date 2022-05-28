import type { IPet } from 'common/types';
import { generatePetName } from 'common/utils/textgen';
import { avatars, type Avatar } from 'assets/images/avatars';
import { roll } from './roll';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890', 3);

const generatePet = (): IPet => {
  const id = nanoid();
  return {
    id,
    name: generatePetName(),
    avatar: Object.keys(avatars)[roll(0, 9)] as Avatar,
    stats: {
      isAwake: true,
      fatigue: roll(0, 10),
      hunger: roll(0, 10),
      health: roll(5, 10),
      morale: roll(2, 10),
      age: roll(0, 100),
    },
    attributes: {
      supply: roll(1, 10),
      vitality: roll(1, 10),
      willpower: roll(1, 10),
      friendliness: roll(0, 10),
      maxAge: roll(100, 300),
    },
    relations: {},
  };
};

export { generatePet };
